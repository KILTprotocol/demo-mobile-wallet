import React from 'react'
import { Text, View, Picker } from 'react-native'
import SegmentedControlIOS from '@react-native-community/segmented-control'
import { QRCode } from 'react-native-custom-qr-codes'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Identity, PublicIdentity, IPublicIdentity } from '@kiltprotocol/sdk-js'
import ClaimForm from './ClaimForm'
import KiltButton from './KiltButton'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import { h2, bodyTxt } from '../sharedStyles/styles.typography'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import QrCodeScanner from './QrCodeScanner'
import {
  TMapStateToProps,
  TMapDispatchToProps,
  TClaim,
  THashAndClaimStatus,
  TClaimContents,
  TContact,
} from '../_types'
import { TAppState } from '../redux/reducers'
import { addClaim, updateClaimStatus } from '../redux/actions'
import AddressDisplay from './AddressDisplay'
import {
  formatDateForClaim,
  createClaim,
  createRequestForAttestation,
  sendRequestForAttestation,
} from '../services/service.claim'
import { ClaimStatus } from '../_enums'
import { fromStoredIdentity } from '../utils/utils.identity'
import { CLR_KILT_0, CLR_TXT } from '../sharedStyles/styles.consts.colors'
import { sPicker } from '../sharedStyles/styles.pickers'
import { CTYPE } from '../_config'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  addClaimInStore: typeof addClaim
  updateClaimStatusInStore: typeof updateClaimStatus
  usernameFromStore: string
  contactsFromStore: TContact[]
}

type State = {
  claimContents: object
  attesterPublicIdentity: IPublicIdentity | null
  selectedAttesterMethod: number
}

const ATTESTER_METHODS = ['Scan QR Code', 'Select from Contacts']

const propertiesNames = Object.keys(CTYPE.schema.properties)
const claimProperties = CTYPE.schema.properties

const getDefaultClaimPropertyValue = (type: string, format: string): any => {
  if (type === 'boolean') {
    return false
  } else if (type === 'string' && format === 'date') {
    return Date.now()
  } else {
    return ''
  }
}

const claimContentsDefault = propertiesNames.reduce(
  (acc, claimPropertyName) => ({
    ...acc,
    [claimPropertyName]: getDefaultClaimPropertyValue(
      claimProperties[claimPropertyName].type,
      claimProperties[claimPropertyName].format
    ),
  }),
  {}
)
console.log(claimContentsDefault)

class NewClaim extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'New Claim',
    headerRightContainerStyle: {
      paddingRight: 10,
    },
    // headerRight: (
    //   <KiltButton
    //     onPress={() => {
    //       // createClaimAndRequestAttestation()
    //     }}
    //     title="✓ Send"
    //   />
    // ),
  }

  state = {
    claimContents: claimContentsDefault,
    attesterPublicIdentity: null,
    selectedAttesterMethod: 0,
  }

  async createClaimAndRequestAttestation(): Promise<void> {
    const { claimContents, attesterPublicIdentity } = this.state
    const formattedClaimContents = Object.keys(claimContents).reduce(
      (acc, propertyName) => {
        const propertyValue =
          claimProperties[propertyName].format === 'date'
            ? formatDateForClaim(claimContents[propertyName])
            : claimContents[propertyName]
        return { ...acc, [propertyName]: propertyValue }
      },
      {}
    )

    const { identityFromStore, addClaimInStore } = this.props
    try {
      if (identityFromStore && attesterPublicIdentity) {
        const claim = createClaim(
          formattedClaimContents as TClaimContents,
          identityFromStore
        )
        if (!claim || !identityFromStore) {
          return
        }
        const requestForAttestation = createRequestForAttestation(
          claim,
          identityFromStore
        )
        if (requestForAttestation) {
          addClaimInStore({
            title: 'Claim',
            hash: requestForAttestation.hash,
            cTypeHash: requestForAttestation.ctypeHash.hash,
            status: ClaimStatus.AttestationPending,
            contents: requestForAttestation.claim.contents,
            requestTimestamp: Date.now(),
          })
          const claimerIdentity = fromStoredIdentity(identityFromStore)
          await sendRequestForAttestation(
            requestForAttestation,
            claimerIdentity,
            attesterPublicIdentity
          )
        }
      } else {
        console.info('[CREATE REQUEST] No identity found')
      }
    } catch (error) {
      console.info('[CREATE REQUEST] Error:', error)
    }
  }

  onChangeClaimContentsInputs = (
    inputValue: string,
    claimPropertyId: string
  ) => {
    this.setState(state => ({
      claimContents: { ...state.claimContents, [claimPropertyId]: inputValue },
    }))
  }

  render(): JSX.Element {
    const {
      claimContents,
      attesterPublicIdentity,
      selectedAttesterMethod,
    } = this.state
    const { contactsFromStore, navigation } = this.props
    return (
      <ScrollView style={mainViewContainer}>
        <Text style={h2}>Data</Text>
        <Text style={bodyTxt}>Fill in data for your claim.</Text>
        <ClaimForm
          claimContents={claimContents}
          claimProperties={claimProperties}
          onChangeValue={(value, claimPropertyId) => {
            this.onChangeClaimContentsInputs(value, claimPropertyId)
          }}
        />
        <View style={sectionContainer}>
          <Text style={h2}>Attester</Text>
          <Text style={bodyTxt}>Define the attester for your claim.</Text>
          <SegmentedControlIOS
            tintColor={CLR_KILT_0}
            textColor={CLR_TXT}
            style={{
              height: 44,
              fontSize: 40,
              marginTop: 24,
              marginBottom: 12,
            }}
            values={ATTESTER_METHODS}
            selectedIndex={this.state.selectedAttesterMethod}
            onChange={event => {
              this.setState({
                selectedAttesterMethod: event.nativeEvent.selectedSegmentIndex,
              })
            }}
          />
          {selectedAttesterMethod === 0 ? (
            attesterPublicIdentity ? (
              <AddressDisplay address={attesterPublicIdentity.address} />
            ) : (
              <QrCodeScanner
                onBarCodeRead={barcode => {
                  const publicIdentity = JSON.parse(barcode.data)
                  this.setState({
                    attesterPublicIdentity: new PublicIdentity(
                      publicIdentity.address,
                      publicIdentity.boxPublicKeyAsHex
                    ),
                  })
                }}
              />
            )
          ) : (
            <Picker
              itemStyle={sPicker}
              style={sPicker}
              onValueChange={publicIdentity =>
                this.setState({
                  attesterPublicIdentity: publicIdentity,
                })
              }>
              {contactsFromStore.map(contact => (
                <Picker.Item
                  label={contact.name}
                  value={contact.publicIdentity}
                />
              ))}
            </Picker>
          )}
          <KiltButton
            onPress={async () => {
              await this.createClaimAndRequestAttestation()
              navigation.goBack()
            }}
            title="✓ Send"
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  identityFromStore: state.identityReducer.identity,
  usernameFromStore: state.usernameReducer.username,
  contactsFromStore: state.contactsReducer.contacts,
})

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    addClaimInStore: (claim: TClaim) => {
      dispatch(addClaim(claim))
    },
    updateClaimStatusInStore: (hashAndStatus: THashAndClaimStatus) => {
      dispatch(updateClaimStatus(hashAndStatus))
    },
  }
}

// areClaimContentsOk(claimContents: any): boolean {
//   const areAllClaimPropertiesPresent =
//     Object.keys(claimContents).length === claimProperties.length
//   const areAllClaimPropertiesTruthy = !Object.values(claimContents).some(
//     claimPropertyValue => !claimPropertyValue
//   )
//   return areAllClaimPropertiesPresent && areAllClaimPropertiesTruthy
// }

// onChangeClaimContentsInputs = (
//   inputValue: string,
//   claimPropertyId: string
// ) => {
//   this.setState(state => ({
//     claimContents: { ...state.claimContents, [claimPropertyId]: inputValue },
//   }))
// }
// const ctype = require('../data/ctypeMembership.json')

// const propertiesNames = Object.keys(ctype.schema.properties)

// const claimProperties = propertiesNames.reduce(
//   (acc, c) => [
//     ...acc,
//     {
//       id: c,
//       ...ctype.schema.properties[c],
//     },
//   ],
//   []
// )

// const start = {
//   name: {
//     type: 'string',
//   },
//   birthday: {
//     type: 'string',
//     format: 'date',
//   },
//   premium: {
//     type: 'boolean',
//   },
// }
// const end = [
//   {
//     id: 'name',
//     type: 'string',
//   },
//   {
//     id: 'birthday',
//     type: 'string',
//     format: 'date',
//   },
//   {
//     id: 'premium',
//     type: 'boolean',
//   },
// ]

export default connect(mapStateToProps, mapDispatchToProps)(NewClaim)
