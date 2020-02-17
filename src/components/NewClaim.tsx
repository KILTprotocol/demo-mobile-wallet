import React from 'react'
import { Text, View } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Identity, IPublicIdentity, PublicIdentity } from '@kiltprotocol/sdk-js'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import ClaimForm from './ClaimForm'
import StyledSegmentedControl from './StyledSegmentedControl'
import KiltButton from './KiltButton'
import { h2, bodyTxt } from '../sharedStyles/styles.typography'
import {
  mainViewContainer,
  sectionContainer,
  paddedVerticalM,
  paddedBottomM,
} from '../sharedStyles/styles.layout'
import {
  TMapStateToProps,
  TMapDispatchToProps,
  TClaim,
  THashAndClaimStatus,
  TClaimContents,
  TContact,
} from '../types'
import { TAppState } from '../redux/reducers'
import { addClaim, updateClaimStatus, addContact } from '../redux/actions'
import {
  formatDateForClaim,
  createClaim,
  createRequestForAttestation,
  sendRequestForAttestation,
} from '../services/service.claim'
import { ClaimStatus } from '../enums'
import { fromStoredIdentity } from '../utils/utils.identity'
import { CONFIG_CLAIM } from '../config'
import ContactSection from './ContactSection'
import QrCodeSection from './QrCodeSection'
import { getClaimContentsDefault } from '../utils/utils.claim'

const claimProperties = CONFIG_CLAIM.CTYPE.schema.properties
const claimContentsDefault = getClaimContentsDefault(claimProperties)
const ATTESTER_METHODS = ['Scan QR Code', 'Select from Contacts']

type Props = {
  addContactInStore: typeof addContact
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  addClaimInStore: typeof addClaim
  updateClaimStatusInStore: typeof updateClaimStatus
  usernameFromStore: string
  contactsFromStore: TContact[]
}

type State = {
  shouldAddToContacts: boolean
  claimContents: object
  attesterPublicIdentity: IPublicIdentity | null
  selectedAttesterMethod: number
  newContactName: string
}

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
    shouldAddToContacts: true,
    claimContents: claimContentsDefault,
    attesterPublicIdentity: null,
    selectedAttesterMethod: 0,
    newContactName: '',
  }

  onChangeClaimContentsInputs = (
    inputValue: string,
    claimPropertyId: string
  ): void => {
    this.setState(state => ({
      claimContents: {
        ...state.claimContents,
        [claimPropertyId]: inputValue,
      },
    }))
  }

  async createClaimAndRequestAttestation(): Promise<void> {
    const { identityFromStore, addClaimInStore } = this.props
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
      shouldAddToContacts,
      claimContents,
      attesterPublicIdentity,
      selectedAttesterMethod,
      newContactName,
    } = this.state
    const { addContactInStore, contactsFromStore, navigation } = this.props
    const { contactsFromStore, navigation } = this.props
    const isAlreadyInContacts = attesterPublicIdentity
      ? contactsFromStore.some(
          c => c.publicIdentity.address === attesterPublicIdentity.address
        )
      : false
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
            <QrCodeSection
              attesterPublicIdentity={attesterPublicIdentity}
              isAlreadyInContacts={isAlreadyInContacts}
              shouldAddToContacts={shouldAddToContacts}
              onToggleShouldAddToContacts={shouldAdd => {
                this.setState({
                  shouldAddToContacts: shouldAdd,
                })
              }}
              onChangeNewContactName={name => this.setState({ newContactName: name })
              }
              setPublicIdentity={publicIdentity => this.setState({
                  attesterPublicIdentity: new PublicIdentity(
                    publicIdentity.address,
                    publicIdentity.boxPublicKeyAsHex,
                    publicIdentity.serviceAddress
                  ),
                })
              }
            />
          ) : (
            <View style={paddedVerticalM}>
              <ContactSection
                contacts={contactsFromStore}
                selectedAddress={
                  attesterPublicIdentity ? attesterPublicIdentity.address : null
                }
                onChangeAddress={address => {
                  const contact = contactsFromStore.find(
                    c => c.publicIdentity.address === address
                  )
                  this.setState({
                    attesterPublicIdentity: contact
                      ? contact.publicIdentity
                      : null,
                  })
                }}
              />
            </View>
          )}
          <View style={paddedVerticalM}>
            <KiltButton
              disabled={!attesterPublicIdentity}
              onPress={async () => {
                await this.createClaimAndRequestAttestation()
                if (shouldAddToContacts) {
                  addContactInStore({
                    publicIdentity: attesterPublicIdentity,
                    name: newContactName,
                  })
                }
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
  addContactInStore: (contact: TContact) => {
    dispatch(addContact(contact))
  },
  updateClaimStatusInStore: (hashAndStatus: THashAndClaimStatus) => {
    dispatch(updateClaimStatus(hashAndStatus))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewClaim)
