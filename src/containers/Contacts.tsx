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
  flexRowCenterLayout,
  qrCodeScannerContainer,
} from '../sharedStyles/styles.layout'
import { mainTitleTxt } from '../sharedStyles/styles.typography'
import WithDefaultBackground from '../components/WithDefaultBackground'
import AddContactDialog from '../components/AddContactDialog'
import { addContact, deleteAllContacts } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import { TMapDispatchToProps, TContact } from '../_types'
import ContactList from '../components/ContactList'
import QrCodeScanner from '../components/QrCodeScanner'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  addContactInStore: typeof addContact
  deleteAllContactsInStore: typeof deleteAllContacts
  contactsFromStore: TContact[]
}

type State = {
  dialogVisible: boolean
  newContactAddress: string
  newContactName: string
}

class Contacts extends React.Component<Props, State> {
  state = {
    dialogVisible: false,
    newContactAddress: '',
    newContactName: '',
  }

  // todo barcode type
  // onBarCodeRead(barcode): void {
  //   this.setState({
  //     dialogVisible: true,
  //     scannerOpen: false,
  //     newContactAddress: barcode.data,
  //   })
  // }

  setNewContactName(newContactName: string): void {
    // todo need or not
    this.setState({
      newContactName: newContactName.trimLeft().trimRight(),
    })
  }

  closeDialog(): void {
    this.setState({ dialogVisible: false })
  }

  openDialog(): void {
    this.setState({
      dialogVisible: true,
      newContactAddress: '',
      newContactName: '',
    })
  }

  // todo create vs save vs add vs new
  addNewContact(): void {
    const { addContactInStore } = this.props
    const { newContactAddress, newContactName } = this.state
    addContactInStore({
      name: newContactName,
      address: newContactAddress,
    })
  }

  render(): JSX.Element {
    const { dialogVisible, newContactAddress } = this.state
    const { contactsFromStore, deleteAllContactsInStore } = this.props
    // todo delete contacts on reset app
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Contacts</Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowCenterLayout}>
              <KiltButton
                title="Add new contact"
                onPress={() => {
                  this.openDialog()
                }}
              />
            </View>
            <View style={flexRowCenterLayout}>
              <KiltButton
                title="Delete all contacts"
                onPress={() => {
                  deleteAllContactsInStore()
                }}
              />
            </View>
          </View>
          {/* todo rename booleans */}
          {/* todo refactor dialogs eg DRY */}
          <View>
            <ContactList contacts={contactsFromStore} />
          </View>
          <AddContactDialog
            visible={dialogVisible}
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
    // todo replace any
    addContactInStore: (contact: TContact) => {
      dispatch(addContact(contact))
    },
    deleteAllContactsInStore: () => {
      dispatch(deleteAllContacts())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
