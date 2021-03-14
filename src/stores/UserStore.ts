import {action, makeObservable, observable} from 'mobx'
import User from '../models/UserModel'
// import commonStore from './CommonStore'

class UserStore {

    // current user
    @observable user: User | null = null
    // username input
    @observable userName: string = ''
    // password input
    @observable password: string = ''

    constructor() {
        makeObservable(this)
    }

    @action setUser(user: User | null) {
        this.user = user
    }

    @action setUserName(userName: string) {
        this.userName = userName
    }

    @action setPassword(password: string) {
        this.password = password
    }

    @action reset() {
        this.userName = ''
        this.password = ''
    }

    @action check () {
      // TODO fetch user data from the rest api
      this.setUser(new User("Fake User"));
        // commonStore.clearError()
        // commonStore.setLoading(true)

        /* fetch('api/auth/user/check', {
            method: 'GET'
        }).then((response) => {
            // из полученного отклика сервера извлечь тело - json-string,
            // преобразовать в json-object
            // и передать для дальнейшей обработки
            return response.json()
        }).then((response) => {
            // если объект отклика сервера получен
            if (response) {
                if (response.status === 'success') {
                    if (response.data) {
                        this.user = new User(response.data.name, response.data.roleName)
                    }
                } else if (response.status === 'fail') {
                    // установка в переменную хранилища сообщения об ошибке
                    commonStore.setError(response.message)
                }
            }
        }).catch((error) => {
            // установка в переменную хранилища сообщения об ошибке
            commonStore.setError(error.message)
            // перевыброс объекта аргументов исключения
            throw error
        }).finally(action(() => {
            // отключение анимации ожидания
            commonStore.setLoading(false)
        })) */
    }

    @action login () {
      this.check()
        /*// сброс текста возможной предыдущей ошибки
        commonStore.clearError()
        // включение анимации ожидания
        commonStore.setLoading(true)
        // запрос на стандартную конечную точку /login
        // Spring Security Web API
        // с передачей имени и пароля пользователя для входа в учетную запись
        fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${this.userName}&password=${this.password}`
        }).then((response) => {
            // из полученного отклика сервера извлечь код статуса
            // и передать для дальнейшей обработки
            return response.status
        }).then((statusCode) => {
            // если в объекте отклика код статуса равен 200
            if (statusCode == this.HTTP_STATUS_OK) {
                this.check()
            } else {
                commonStore.setError("Login or password is wrong")
            }
        }).catch((error) => {
            // установка в переменную хранилища сообщения об ошибке
            commonStore.setError(error.message)
            // перевыброс объекта аргументов исключения
            throw error
        }).finally(action(() => {
            // отключение анимации ожидания
            commonStore.setLoading(false)
        })) */
    }

    @action logout () {
      this.setUser(null)
        /*commonStore.setLoading(true)
        fetch('logout', {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response) {
                if (response.status === 'success') {
                    this.user = null
                } else if (response.status === 'fail') {
                    commonStore.setError(response.message)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))*/
    }

    @action register () {
        /* // сброс текста возможной предыдущей ошибки
        commonStore.clearError()
        // включение анимации ожидания
        commonStore.setLoading(true)
        // запрос на пользовательскую конечную точку /api/auth/user
        // REST-контроллера AuthController
        // с передачей имени и пароля пользователя для регистрации
        fetch('api/auth/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({'name': this.userName, 'password': this.password})
        }).then((response) => {
            // из полученного отклика сервера извлечь тело (json-строку)
            // и передать для дальнейшей обработки
            return response.json()
        }).then((response) => {
            // если в объекте отклика статус равен 'success'
            if (response.status === 'success') {
                this.login()
            } else {
                commonStore.setError(response.message)
            }
        }).catch((error) => {
            // установка в переменную хранилища сообщения об ошибке
            commonStore.setError(error.message)
            // перевыброс объекта аргументов исключения
            throw error
        }).finally(action(() => {
            // отключение анимации ожидания
            commonStore.setLoading(false)
        })) */
    }
}
export {UserStore}
export default new UserStore()