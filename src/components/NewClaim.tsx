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
import { sendRequestForAttestation } from '../services/service.messaging'
import ClaimForm from './ClaimForm'
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
} from '../services/service.claim'
import { ClaimStatus } from '../enums'
import { fromStoredIdentity } from '../utils/utils.identity'
import { CONFIG_CLAIM } from '../config'
import { getClaimContentsDefault } from '../utils/utils.claim'
import RecipientSelector from './RecipientSelector'

const claimProperties = CONFIG_CLAIM.CTYPE.schema.properties
const claimContentsDefault = getClaimContentsDefault(claimProperties)

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
  isSending: boolean
}

class NewClaim extends React.Component<Props, State> {
  state = {
    shouldAddToContacts: false,
    claimContents: claimContentsDefault,
    attesterPublicIdentity: null,
    attesterSelectionMethod: 0,
    newContactName: '',
    isSending: false,
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
      isSending,
    } = this.state
    const { addContactInStore, contactsFromStore, navigation } = this.props
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
          <Text style={bodyTxt}>Select the Attester for your claim.</Text>
          <RecipientSelector
            publicIdentity={attesterPublicIdentity}
            recipientSelectionMethod={attesterSelectionMethod}
            contacts={contactsFromStore}
            shouldAddToContacts={shouldAddToContacts}
            onToggleShouldAddToContacts={(shouldAdd: boolean) =>
              this.setState({
                shouldAddToContacts: shouldAdd,
              })
            }
            onChangeNewContactName={(name: string) =>
              this.setState({ newContactName: name })
            }
            setPublicIdentity={(publicIdentity: IPublicIdentity) =>
              this.setState({
                attesterPublicIdentity: new PublicIdentity(
                  publicIdentity.address,
                  publicIdentity.boxPublicKeyAsHex,
                  publicIdentity.serviceAddress
                ),
              })
            }
            setPublicIdentityFromContact={contact =>
              this.setState({
                attesterPublicIdentity: contact ? contact.publicIdentity : null,
              })
            }
            onChangeSelectionMethod={event => {
              this.setState({
                attesterPublicIdentity: null,
                attesterSelectionMethod: event.nativeEvent.selectedSegmentIndex,
              })
            }}
          />
          <View style={paddedVerticalM}>
            <KiltButton
              disabled={!attesterPublicIdentity || isSending}
              onPress={async () => {
                this.setState({
                  isSending: true,
                })
                await this.createClaimAndRequestAttestation()
                if (shouldAddToContacts) {
                  addContactInStore({
                    publicIdentity: attesterPublicIdentity,
                    name: newContactName,
                  })
                }
                navigation.goBack()
                this.setState({
                  isSending: false,
                })
              }}
              title="Send claim to Attester"
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
