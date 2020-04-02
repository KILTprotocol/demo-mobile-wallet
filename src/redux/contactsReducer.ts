import { ADD_CONTACT, DELETE_CONTACT, DELETE_ALL_CONTACTS } from './actionTypes'
import { TAppAction, TContact } from '../types'
import { TAppState } from './reducers'

const contactsDefault: TContact[] = []

const INITIAL_STATE = {
  contacts: contactsDefault,
}

export default function contactsReducer(
  state = INITIAL_STATE,
  action: TAppAction
): TAppState {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      }
    case DELETE_CONTACT: {
      const currentContacts = [...state.contacts]
      const contactToDelete = action.payload
      const updatedContacts = currentContacts.filter(
        contact => contact.publicIdentity.address !== contactToDelete
      )
      return {
        ...state,
        contacts: updatedContacts,
      }
    }
    case DELETE_ALL_CONTACTS:
      return {
        ...state,
        contacts: contactsDefault,
      }
    default:
      return state
  }
}
