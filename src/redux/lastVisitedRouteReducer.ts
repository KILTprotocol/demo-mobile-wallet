import {
  RESET_LAST_VISITED_ROUTE,
  UPDATE_LAST_VISITED_ROUTE,
} from './actionTypes'
import { TAppAction } from '../_types'
import { DASHBOARD } from '../_routes'
import { TAppState } from './reducers'

const routeDefault = DASHBOARD

const INITIAL_STATE = {
  lastVisitedRoute: routeDefault,
}

export default function lastVisitedRouteReducer(
  state = INITIAL_STATE,
  action: TAppAction
): TAppState {
  switch (action.type) {
    case UPDATE_LAST_VISITED_ROUTE:
      return {
        ...state,
        lastVisitedRoute: action.payload,
      }
    case RESET_LAST_VISITED_ROUTE:
      return {
        ...state,
        lastVisitedRoute: routeDefault,
      }
    default:
      return state
  }
}
