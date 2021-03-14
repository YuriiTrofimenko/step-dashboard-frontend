import { action, makeObservable, observable, reaction } from "mobx"
import About from "../components/pages/About"
import AudienceEditor from "../components/pages/admin/AudienceEditor"
import Home from "../components/pages/Home"
import Schedule from "../components/pages/Schedule"
import SignIn from "../components/pages/SignIn"
import RouteModel from "../models/RouteModel"
import UserModel from "../models/UserModel"
import userStore from "./UserStore"

class RouterStore {

  // routes for anonymous users
  private anonymousRoutes: Array<RouteModel> = [
      { uri: '/', name: 'Home', Component: Home },
      { uri: '/schedule', name: 'Schedule', Component: Schedule },
      { uri: '/about', name: 'About', Component: About },
      { uri: '/signin', name: 'Sign in', Component: SignIn }/* ,
      { path: '/signup', name: 'Register', Component: SignUp } */
  ]

  // routes for logged users
  private loggedRoutes: Array<RouteModel> = [
    { uri: '/', name: 'Home', Component: Home },
    { uri: '/schedule', name: 'Schedule', Component: Schedule },
    { uri: '/audiences', name: 'Audiences', Component: AudienceEditor },
    { uri: '/about', name: 'About', Component: About },
    { uri: '/auth:out', name: 'Sign out', Component: Home }
  ]

  /* private adminRoutes: Array<RouteModel> = [
      { path: '/', name: 'Home', Component: Home },
      { path: '/shopping', name: 'Shopping', Component: Shopping },
      { path: '/admin', name: 'Dashboard', Component: Dashboard },
      { path: '/admin/categories', name: 'DashboardCategories', Component: DashboardCategories },
      { path: '/admin/products', name: 'DashboardProducts', Component: DashboardProducts },
      { path: '/auth:out', name: `Sign out`, Component: Home }
  ] */

  @observable routes: Array<RouteModel> = this.anonymousRoutes

  constructor() {
      makeObservable(this)
  }

  // установить в качестве текущего список роутов для гостя
  @action setAnonymousRoutes() {
      this.routes = this.anonymousRoutes
  }

  // установить в качестве текущего список роутов для аунтентифицированного пользователя
  @action setLoggedRoutes() {
      this.routes = this.loggedRoutes
  }

  /* @action setAdminRoutes() {
      this.routes = this.adminRoutes
  } */

  // реакция на изменение значения наблюдаемого свойства userStore.user:
  // если userStore.user установлен,
  // в текущем списке моделей роутов ищем
  // модель, в свойстве name которой содержится подстрока 'Sign out'
  userReaction = reaction(
      () => userStore.user,
      (user: UserModel | null) => {
          if (user) {
              let signOutRoute
              /* if (user.roleName === 'ROLE_ADMIN') {
                  signOutRoute =
                      this.adminRoutes
                          .find(route => route['name'].includes('Sign out'))
              } else {
                  signOutRoute =
                      this.loggedRoutes
                          .find(route => route['name'].includes('Sign out'))
              } */
              signOutRoute =
                this.loggedRoutes
                  .find(route => route['name'].includes('Sign out'))
              if (signOutRoute) {
                signOutRoute['name'] = `Sign out (${user.name})`
              }
          }
      }
  )
}

export {RouterStore}
export default new RouterStore()