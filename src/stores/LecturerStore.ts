import {action, makeObservable, observable} from 'mobx'
import FakeAPI from '../models/FakeAPI'
import LecturerModel from '../models/LecturerModel'

class LecturerStore {
  @observable lecturerList: LecturerModel[] = []
  @observable currentLecturer: LecturerModel | null = null
  @observable name: string | null = null

  // for MobX version 6
  constructor() {
      makeObservable(this)
  }

  @action fetchLecturerList (): void {
    this.lecturerList.length = 0
    this.lecturerList.unshift(...FakeAPI.lecturerList)
  }
  @action setName (name: string): void {
    this.name = name
  }
  @action addLecturer (): void {
    this.lecturerList.unshift(
      new LecturerModel(this.name)
    )
  }
}

export { LecturerStore }
export default new LecturerStore()