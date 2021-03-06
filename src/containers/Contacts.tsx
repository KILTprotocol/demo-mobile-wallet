import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import { IPublicIdentity, PublicIdentity } from '@kiltprotocol/sdk-js'
import { View, Text } from 'react-native'
import StyledButton from '../components/StyledButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowCenter,
} from '../sharedStyles/styles.layout'
import { h1 } from '../sharedStyles/styles.typography'
import WithDefaultBackground from '../components/WithDefaultBackground'
import AddContactDialog from '../components/AddContactDialog'
import { addContact, deleteContact } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import { TMapDispatchToProps, TContact } from '../types'
import ContactList from '../components/ContactList'
import { decodePublicIdentity } from '../utils/utils.encoding'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  addContactInStore: typeof addContact
  deleteContactInStore: typeof deleteContact
  contactsFromStore: TContact[]
}

type State = {
  isDialogVisible: boolean
  newContactPublicIdentity: IPublicIdentity | null
  newContactName: string
}

class Contacts extends React.Component<Props, State> {
  state = {
    isDialogVisible: false,
    newContactPublicIdentity: null,
    newContactName: '',
  }

  setNewContactName(newContactName: string): void {
    this.setState({
      newContactName: newContactName.trimLeft().trimRight(),
    })
  }

  checkContactAlreadyExists(address: PublicIdentity['address']): boolean {
    const { contactsFromStore } = this.props
    return contactsFromStore.some(c => c.publicIdentity.address === address)
  }

  addNewContact(): void {
    const { addContactInStore } = this.props
    const { newContactPublicIdentity, newContactName } = this.state
    if (
      newContactPublicIdentity &&
      // check if the contact already exists
      !this.checkContactAlreadyExists(newContactPublicIdentity.address)
    ) {
      addContactInStore({
        name: newContactName,
        publicIdentity: newContactPublicIdentity,
      })
    }
  }

  deleteExistingContact(address: IPublicIdentity['address']): any {
    const { deleteContactInStore } = this.props
    deleteContactInStore(address)
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  openDialog(): void {
    this.setState({
      isDialogVisible: true,
      newContactPublicIdentity: null,
      newContactName: '',
    })
  }

  render(): JSX.Element {
    const { isDialogVisible, newContactPublicIdentity } = this.state
    const { contactsFromStore } = this.props
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={h1}>Contacts</Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowCenter}>
              <StyledButton
                title="＋ Add new contact"
                onPress={() => {
                  this.openDialog()
                }}
              />
            </View>
          </View>
          <View>
            <ContactList
              contacts={contactsFromStore}
              deleteContactOnClick={address =>
                this.deleteExistingContact(address)
              }
            />
          </View>
          <AddContactDialog
            visible={isDialogVisible}
            publicIdentity={newContactPublicIdentity}
            onPressCancel={() => this.closeDialog()}
            onChangeContactName={name => this.setNewContactName(name)}
            onNewContactPublicIdentityRead={publicIdentityEncodedString => {
              const publicIdentityEncoded = JSON.parse(
                publicIdentityEncodedString,
              )
              const publicIdentity = decodePublicIdentity(publicIdentityEncoded)
              this.setState({
                newContactPublicIdentity: new PublicIdentity(
                  publicIdentity.address,
                  publicIdentity.boxPublicKeyAsHex,
                  publicIdentity.serviceAddress,
                ),
              })
            }}
            onConfirmAddContact={() => {
              this.addNewContact()
              this.closeDialog()
            }}
          />
        </ScrollView>
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): TAppState => ({
  contactsFromStore: state.contactsReducer.contacts,
})

const mapDispatchToProps = (
  dispatch: Dispatch,
): Partial<TMapDispatchToProps> => ({
  addContactInStore: (contact: TContact) => {
    dispatch(addContact(contact))
  },
  deleteContactInStore: (address: IPublicIdentity['address']) => {
    dispatch(deleteContact(address))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
