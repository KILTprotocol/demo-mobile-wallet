import {
  NavigationActions,
  NavigationContainerComponent,
} from 'react-navigation'

let _navigator: NavigationContainerComponent

function setTopLevelNavigator(
  navigatorRef: NavigationContainerComponent
): void {
  _navigator = navigatorRef
}

function navigate(routeName: string, params): void {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function getCurrentRoute(): object | null {
  if (_navigator) {
    let route = _navigator.state.nav
    while (route.routes) {
      route = route.routes[route.index]
    }
    return route
  }
  return null
}

export { navigate, setTopLevelNavigator, getCurrentRoute }
