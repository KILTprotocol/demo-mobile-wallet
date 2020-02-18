import { ADD_CONTACT, DELETE_ALL_CONTACTS } from './actionTypes'
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
    case DELETE_ALL_CONTACTS:
      return {
        ...state,
        contacts: contactsDefault,
      }
    default:
      return state
  }
}
