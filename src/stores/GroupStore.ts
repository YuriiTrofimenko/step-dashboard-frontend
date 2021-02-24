import {action, makeObservable, observable} from 'mobx'
import FakeAPI from '../models/FakeAPI'
import GroupModel from '../models/GroupModel'

class GroupStore {
  @observable groupList: GroupModel[] = []
  @observable currentGroup: GroupModel | null = null
  @observable name: string | null = null

  // for MobX version 6
  constructor() {
      makeObservable(this)
  }

  @action fetchGroupList (): void {
    this.groupList.length = 0
    this.groupList.unshift(...FakeAPI.groupList)
  }
  @action setName (name: string): void {
    this.name = name
  }
  @action addGroup (): void {
    this.groupList.unshift(
      new GroupModel(this.name)
    )
  }
}

export { GroupStore }
export default new GroupStore()