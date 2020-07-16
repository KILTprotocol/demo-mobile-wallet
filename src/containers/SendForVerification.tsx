import React from 'react'
import { Text, View } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  Identity,
  IPublicIdentity,
  PublicIdentity,
  IAttestedClaim,
} from '@kiltprotocol/sdk-js'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import { sendAttestedClaim } from '../services/service.messaging'
import { CLAIM_HASH } from '../navigationParameters'
import StyledButton from '../components/StyledButton'
import { h2, bodyTxt } from '../sharedStyles/styles.typography'
import {
  mainViewContainer,
  paddedVerticalM,
} from '../sharedStyles/styles.layout'
import {
  TMapStateToProps,
  TMapDispatchToProps,
  TContact,
  TClaimMapByHash,
} from '../types'
import { TAppState } from '../redux/reducers'
import { addClaim, addContact } from '../redux/actions'
import RecipientSelector from '../components/RecipientSelector'

type Props = {
  addContactInStore: typeof addContact
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  addClaimInStore: typeof addClaim
  usernameFromStore: string
  contactsFromStore: TContact[]
  claimsMapFromStore: TClaimMapByHash
}

type State = {
  shouldAddToContacts: boolean
  verifierPublicIdentity: IPublicIdentity | null
  verifierSelectionMethod: number
  newContactName: string
  isSending: boolean
}

class SendForVerification extends React.Component<Props, State> {
  state = {
    shouldAddToContacts: false,
    verifierPublicIdentity: null,
    verifierSelectionMethod: 0,
    newContactName: '',
    isSending: false,
  }

  static navigationOptions = {
    title: 'Send to Verifier',
    headerRightContainerStyle: {
      paddingRight: 10,
    },
  }

  render(): JSX.Element {
    const {
      shouldAddToContacts,
      verifierPublicIdentity,
      verifierSelectionMethod,
      newContactName,
      isSending,
    } = this.state
    const {
      addContactInStore,
      identityFromStore,
      claimsMapFromStore,
      contactsFromStore,
      navigation,
    } = this.props
    const claimHash: string = navigation.getParam(CLAIM_HASH)

    return (
      <ScrollView style={mainViewContainer}>
        <Text style={h2}>Verifier</Text>
        <Text style={bodyTxt}>
          Select a Verifier to send your attested claim to.
        </Text>
        <RecipientSelector
          publicIdentity={verifierPublicIdentity}
          recipientSelectionMethod={verifierSelectionMethod}
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
              verifierPublicIdentity: new PublicIdentity(
                publicIdentity.address,
                publicIdentity.boxPublicKeyAsHex,
                publicIdentity.serviceAddress
              ),
            })
          }
          setPublicIdentityFromContact={contact =>
            this.setState({
              verifierPublicIdentity: contact ? contact.publicIdentity : null,
            })
          }
          onChangeSelectionMethod={event => {
            this.setState({
              verifierPublicIdentity: null,
              verifierSelectionMethod: event.nativeEvent.selectedSegmentIndex,
            })
          }}
        />
        <View style={paddedVerticalM}>
          <StyledButton
            disabled={!verifierPublicIdentity || isSending}
            onPress={async () => {
              this.setState({
                isSending: true,
              })
              const attestedClaim = claimsMapFromStore[claimHash]
              if (identityFromStore && verifierPublicIdentity) {
                await sendAttestedClaim(
                  attestedClaim.data as IAttestedClaim,
                  identityFromStore,
                  verifierPublicIdentity
                )
                if (shouldAddToContacts) {
                  addContactInStore({
                    publicIdentity: verifierPublicIdentity,
                    name: newContactName,
                  })
                }
              }
              navigation.goBack()
              this.setState({
                isSending: false,
              })
            }}
            title="Send attested claim to Verifier"
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  contactsFromStore: state.contactsReducer.contacts,
  claimsMapFromStore: state.claimsReducer.claimsMap,
  identityFromStore: state.identityReducer.identity,
})

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => ({
  addContactInStore: (contact: TContact) => {
    dispatch(addContact(contact))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendForVerification)
