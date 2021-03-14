import {action, makeObservable, observable} from 'mobx'

class CommonStore {

    @observable loading: boolean = false
    @observable error: string | null = null
    @observable basename: string = '/'

    constructor() {
        makeObservable(this)
    }

    @action setLoading(loading: boolean): void {
        this.loading = loading
    }

    @action setError(error: string | null): void {
        this.error = error
    }

    @action clearError(): void {
        this.error = null
    }
}
export {CommonStore}
export default new CommonStore()