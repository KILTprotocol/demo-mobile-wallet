import {
  NavigationActions,
  NavigationContainerComponent,
} from 'react-navigation'

let navigator: NavigationContainerComponent

function setTopLevelNavigator(
  navigatorRef: NavigationContainerComponent
): void {
  navigator = navigatorRef
}

function navigate(routeName: string, params: any): void {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function getCurrentRoute(): object | null {
  if (navigator) {
    let route = navigator.state.nav
    while (route.routes) {
      route = route.routes[route.index]
    }
    return route
  }
  return null
}

export { navigate, setTopLevelNavigator, getCurrentRoute }
