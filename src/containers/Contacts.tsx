import React from 'react'
import { View, Text } from 'react-native'
import { Dispatch } from 'redux'
import { RNCamera } from 'react-native-camera'
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
} from '../sharedStyles/styles.layout'
import { mainTitleTxt } from '../sharedStyles/styles.typography'
import WithDefaultBackground from '../components/WithDefaultBackground'
import AddContactDialog from '../components/AddContactDialog'
import { addContact, deleteAllContacts } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import { TMapDispatchToProps, TContact } from '../_types'
import QRCodeScanner from '../components/QRCodeScanner'
import ContactList from '../components/ContactList'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  addContactInStore: typeof addContact
  deleteAllContactsInStore: typeof deleteAllContacts
  contactsFromStore: TContact[]
}

type State = {
  dialogVisible: boolean
  scannerOpen: boolean
  newContactAddress: string
  newContactName: string
}

class Contacts extends React.Component<Props, State> {
  state = {
    dialogVisible: false,
    scannerOpen: false,
    newContactAddress: '',
    newContactName: '',
  }

  // todo barcode type
  onBarCodeRead(barcode): void {
    this.setState({
      dialogVisible: true,
      scannerOpen: false,
      newContactAddress: barcode.data,
    })
  }

  setNewContactName(newContactName: string): void {
    // todo need or not
    this.setState({
      newContactName,
    })
  }

  closeDialog(): void {
    this.setState({ dialogVisible: false })
  }

  // todo create vs save vs new
  createNewContact(): void {
    const { addContactInStore } = this.props
    const { newContactAddress, newContactName } = this.state
    addContactInStore({
      name: newContactName,
      address: newContactAddress,
    })
  }

  render(): JSX.Element {
    const { dialogVisible, scannerOpen, newContactAddress } = this.state
    const { contactsFromStore, deleteAllContactsInStore } = this.props
    console.log(contactsFromStore)
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
                  this.setState({
                    scannerOpen: true,
                  })
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
          {scannerOpen && (
            <QRCodeScanner
              onBarCodeRead={barcode => this.onBarCodeRead(barcode)}
            />
          )}
          <View>
            <ContactList contacts={contactsFromStore} />
          </View>
          <AddContactDialog
            visible={dialogVisible}
            address={newContactAddress}
            onPressCancel={() => this.closeDialog()}
            onChangeContactName={name => this.setNewContactName(name)}
            onPressOK={() => {
              this.createNewContact()
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
