import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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
import WithDefaultBackground from './WithDefaultBackground'
import AddContactDialog from './AddContactDialog'
import { addContact, deleteAllContacts } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import { TMapDispatchToProps, TContact } from '../_types'

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

const styles = StyleSheet.create({
  cameraPreview: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraContainer: {
    flexDirection: 'column',
    height: '70%',
  },
  scanningStatus: {
    flex: 0,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
})

class Contacts extends React.Component<Props, State> {
  state = {
    dialogVisible: false,
    scannerOpen: false,
    newContactAddress: '',
    newContactName: '',
  }

  onBarCodeRead(barcode): void {
    console.log(barcode)
    this.setState({
      dialogVisible: true,
      scannerOpen: false,
      newContactAddress: barcode.data,
    })
  }

  setNewContactName(newContactName: string): void {
    // todo need or not
    this.setState({
      ...this.state,
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
    this.closeDialog()
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
          {scannerOpen && (
            <View style={styles.cameraContainer}>
              <RNCamera
                ref={ref => {
                  this.camera = ref
                }}
                style={styles.cameraPreview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onBarCodeRead={barcode => this.onBarCodeRead(barcode)}
              />
              <View>
                <TouchableOpacity style={styles.scanningStatus}>
                  <Text>Scanning...</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View>
            {contactsFromStore.map((c: TContact) => (
              <View key={c.address}>
                <Text>{c.name}</Text>
                <Text>{c.address}</Text>
              </View>
            ))}
          </View>
          <AddContactDialog
            visible={dialogVisible}
            address={newContactAddress}
            onPressCancel={() => this.closeDialog()}
            onChangeContactName={name => this.setNewContactName(name)}
            onPressOK={() => {
              this.createNewContact()
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
