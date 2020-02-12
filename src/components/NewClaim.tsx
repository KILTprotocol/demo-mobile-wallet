import React from 'react'
import { Text, View, Picker, Switch } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Identity, PublicIdentity, IPublicIdentity } from '@kiltprotocol/sdk-js'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import ClaimForm from './ClaimForm'
import StyledSegmentedControl from './StyledSegmentedControl'
import KiltButton from './KiltButton'
import {
  h2,
  bodyTxt,
  emptyStateBodyTxt,
} from '../sharedStyles/styles.typography'
import {
  mainViewContainer,
  sectionContainer,
  paddedVerticalM,
  paddedBottomM,
} from '../sharedStyles/styles.layout'
import QrCodeScanner from './QrCodeScanner'
import {
  TMapStateToProps,
  TMapDispatchToProps,
  TClaim,
  THashAndClaimStatus,
  TClaimContents,
  TContact,
} from '../types'
import { TAppState } from '../redux/reducers'
import { addClaim, updateClaimStatus } from '../redux/actions'
import Address from './Address'
import {
  formatDateForClaim,
  createClaim,
  createRequestForAttestation,
  sendRequestForAttestation,
} from '../services/service.claim'
import { ClaimStatus } from '../enums'
import { fromStoredIdentity } from '../utils/utils.identity'
import { sPicker, labelTxt } from '../sharedStyles/styles.form'
import { CONFIG_CLAIM } from '../config'
import { decodePublicIdentity } from '../utils/utils.encoding'
import { truncateAddress } from '../utils/utils.formatting'
import StyledTextInput from './StyledTextInput'

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

const propertiesNames = Object.keys(CONFIG_CLAIM.CTYPE.schema.properties)
const claimProperties = CONFIG_CLAIM.CTYPE.schema.properties

const getDefaultClaimPropertyValue = (type: string, format: string): any => {
  if (type === 'boolean') {
    return false
  }
  if (type === 'string' && format === 'date') {
    return Date.now()
  }
  return ''
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

  onChangeClaimContentsInputs = (
    inputValue: string,
    claimPropertyId: string
  ) => {
    this.setState(state => ({
      claimContents: {
        ...state.claimContents,
        [claimPropertyId]: inputValue,
      },
    }))
  }

  async createClaimAndRequestAttestation(): Promise<void> {
    const { claimContents, attesterPublicIdentity } = this.state
    const formattedClaimContents = Object.keys(claimContents).reduce(
      (acc, propertyName) => {
        const propertyValue =
          claimProperties[propertyName].format === 'date'
            ? formatDateForClaim(claimContents[propertyName])
            : claimContents[propertyName]
        return {
          ...acc,
          [propertyName]: propertyValue,
        }
      },
      {}
    )
    const { identityFromStore, addClaimInStore } = this.props
    try {
      if (identityFromStore && attesterPublicIdentity) {
        const claim = createClaim(
          formattedClaimContents as TClaimContents,
          identityFromStore.address
        )
        if (!claim || !identityFromStore) {
          return
        }
        const requestForAttestation = createRequestForAttestation(
          claim,
          identityFromStore
        )
        if (requestForAttestation && attesterPublicIdentity) {
          addClaimInStore({
            title: CONFIG_CLAIM.CLAIM_CARD_TITLE,
            hash: requestForAttestation.rootHash,
            cTypeHash: claim.cTypeHash,
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
        <View style={paddedBottomM}>
          <Text style={bodyTxt}>Fill in data for your claim.</Text>
        </View>
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
          <StyledSegmentedControl
            values={ATTESTER_METHODS}
            selectedIndex={selectedAttesterMethod}
            onChange={event => {
              this.setState({
                attesterPublicIdentity: null,
                selectedAttesterMethod: event.nativeEvent.selectedSegmentIndex,
              })
            }}
          />

          {selectedAttesterMethod === 0 ? (
            attesterPublicIdentity ? (
              <>
                <Address address={attesterPublicIdentity.address} />
                <View>
                  <Switch onValueChange={v => console.log(v)} />
                  <Text style={[bodyTxt, labelTxt]}>
                    Also add this attester to my contacts Contact name:
                  </Text>
                  <Text style={[bodyTxt, labelTxt]}>Contact name:</Text>
                  <StyledTextInput returnKeyType="done" />
                </View>
              </>
            ) : (
              <QrCodeScanner
                onBarCodeRead={barcode => {
                  const publicIdentityEncoded = JSON.parse(barcode.data)
                  const publicIdentity = decodePublicIdentity(
                    publicIdentityEncoded
                  )
                  this.setState({
                    attesterPublicIdentity: new PublicIdentity(
                      publicIdentity.address,
                      publicIdentity.boxPublicKeyAsHex,
                      publicIdentity.serviceAddress
                    ),
                  })
                }}
              />
            )
          ) : contactsFromStore.length > 0 ? (
            <View style={paddedVerticalM}>
              <Text style={[bodyTxt, labelTxt]}>Contacts:</Text>
              <Picker
                itemStyle={{
                  ...sPicker,
                  textAlign: 'left',
                }}
                style={sPicker}
                selectedValue={
                  attesterPublicIdentity ? attesterPublicIdentity.address : null
                }
                onValueChange={address => {
                  // const publicIdentity = findPublicIdentityFromAddress()

                  const contact = contactsFromStore.find(
                    c => c.publicIdentity.address === address
                  )
                  if (contact) {
                    this.setState({
                      address,
                      attesterPublicIdentity: contact.publicIdentity,
                    })
                  } else {
                    this.setState({
                      // address: address,
                      attesterPublicIdentity: null,
                    })
                  }
                }}
              >
                <Picker.Item label="(↓ Select a contact)" value={null} />
                {contactsFromStore.map(contact => (
                  <Picker.Item
                    label={`${contact.name}  (${truncateAddress(
                      contact.publicIdentity.address,
                      2
                    )})${contact.publicIdentity.serviceAddress ? '📭' : ''}`}
                    value={contact.publicIdentity.address}
                  />
                ))}
              </Picker>
            </View>
          ) : (
            <View style={paddedVerticalM}>
              <Text style={emptyStateBodyTxt}>No contacts yet.</Text>
            </View>
          )}
          <View style={paddedVerticalM}>
            <KiltButton
              disabled={!attesterPublicIdentity}
              onPress={async () => {
                await this.createClaimAndRequestAttestation()
                navigation.goBack()
              }}
              title="✓ OK, send Claim to Attester"
            />
          </View>
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
): Partial<TMapDispatchToProps> => ({
  addClaimInStore: (claim: TClaim) => {
    dispatch(addClaim(claim))
  },
  updateClaimStatusInStore: (hashAndStatus: THashAndClaimStatus) => {
    dispatch(updateClaimStatus(hashAndStatus))
  },
})

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewClaim)
