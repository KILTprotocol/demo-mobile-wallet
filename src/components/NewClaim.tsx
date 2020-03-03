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
  TClaimContents,
  TContact,
} from '../types'
import { TAppState } from '../redux/reducers'
import { addClaim, addContact } from '../redux/actions'
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
const ATTESTER_SELECTION_METHODS = ['Scan QR Code', 'Select from Contacts']

type Props = {
  addContactInStore: typeof addContact
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  addClaimInStore: typeof addClaim
  usernameFromStore: string
  contactsFromStore: TContact[]
}

type State = {
  shouldAddToContacts: boolean
  claimContents: object
  attesterPublicIdentity: IPublicIdentity | null
  attesterSelectionMethod: number
  newContactName: string
}

class NewClaim extends React.Component<Props, State> {
  state = {
    shouldAddToContacts: true,
    claimContents: claimContentsDefault,
    attesterPublicIdentity: null,
    attesterSelectionMethod: 0,
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

  static navigationOptions = {
    title: 'New Claim',
    headerRightContainerStyle: {
      paddingRight: 10,
    },
    tabBarVisible: false,
    // headerRight: (
    //   <KiltButton
    //     onPress={() => {
    //       // createClaimAndRequestAttestation()
    //     }}
    //     title="✓ Send"
    //   />
    // ),
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
            // needed
            hash: requestForAttestation.rootHash,
            status: ClaimStatus.AttestationPending,
            // todo remove???
            contents: requestForAttestation.claim.contents,
            requestTimestamp: Date.now(),
            data: requestForAttestation,
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
      attesterSelectionMethod,
      newContactName,
    } = this.state
    const { addContactInStore, contactsFromStore, navigation } = this.props
    // todo make it a selector
    const isAlreadyInContacts = attesterPublicIdentity
      ? contactsFromStore.some(
          c => c.publicIdentity.address === attesterPublicIdentity.address
        )
      : false
    return (
      <ScrollView style={mainViewContainer}>
        <Text style={h2}>Data</Text>
        <View style={paddedBottomM}>
          <Text style={bodyTxt}>Fill in data for your claim</Text>
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
            values={ATTESTER_SELECTION_METHODS}
            selectedIndex={attesterSelectionMethod}
            onChange={event => {
              this.setState({
                attesterPublicIdentity: null,
                attesterSelectionMethod: event.nativeEvent.selectedSegmentIndex,
              })
            }}
          />
          {attesterSelectionMethod === 0 ? (
            <QrCodeSection
              publicIdentity={attesterPublicIdentity}
              isAlreadyInContacts={isAlreadyInContacts}
              shouldAddToContacts={shouldAddToContacts}
              onToggleShouldAddToContacts={shouldAdd => {
                this.setState({
                  shouldAddToContacts: shouldAdd,
                })
              }}
              onChangeNewContactName={name =>
                this.setState({ newContactName: name })
              }
              setPublicIdentity={publicIdentity =>
                this.setState({
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
          {/* todo unify empty state approach */}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewClaim)
