import React from 'react'
import { View, Text } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import KiltButton from '../components/KiltButton'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import {
  mainViewContainer,
  sectionContainer,
  flexRowCenter,
} from '../sharedStyles/styles.layout'
import { h1 } from '../sharedStyles/styles.typography'
import WithDefaultBackground from '../components/WithDefaultBackground'
import AddContactDialog from '../components/AddContactDialog'
import { addContact } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import { TMapDispatchToProps, TContact } from '../types'
import ContactList from '../components/ContactList'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  addContactInStore: typeof addContact
  contactsFromStore: TContact[]
}

type State = {
  isDialogVisible: boolean
  newContactAddress: IPublicIdentity['address']
  newContactName: string
}

class Contacts extends React.Component<Props, State> {
  state = {
    isDialogVisible: false,
    newContactAddress: '',
    newContactName: '',
  }
  // also: create vs save vs add vs new

  setNewContactName(newContactName: string): void {
    this.setState({
      newContactName: newContactName.trimLeft().trimRight(),
    })
  }

  addNewContact(): void {
    const { addContactInStore, contactsFromStore } = this.props
    const { newContactAddress, newContactName } = this.state
    if (
      // check if the contact already exists
      !contactsFromStore.some(c => c.address === newContactAddress)
    ) {
      addContactInStore({
        name: newContactName,
        address: newContactAddress,
      })
    }
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  openDialog(): void {
    this.setState({
      isDialogVisible: true,
      newContactAddress: '',
      newContactName: '',
    })
  }

  render(): JSX.Element {
    const { isDialogVisible, newContactAddress } = this.state
    const { contactsFromStore } = this.props
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={h1}>Contacts</Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowCenter}>
              <KiltButton
                title="＋ Add new contact"
                onPress={() => {
                  this.openDialog()
                }}
              />
            </View>
          </View>
          <View>
            <ContactList contacts={contactsFromStore} />
          </View>
          <AddContactDialog
            visible={isDialogVisible}
            address={newContactAddress}
            onPressCancel={() => this.closeDialog()}
            onChangeContactName={name => this.setNewContactName(name)}
            onNewContactAddressRead={address => {
              this.setState({
                newContactAddress: address,
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

const mapStateToProps = (state: TAppState): TAppState => {
  return {
    contactsFromStore: state.contactsReducer.contacts,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    addContactInStore: (contact: TContact) => {
      dispatch(addContact(contact))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
