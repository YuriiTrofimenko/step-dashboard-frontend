import {action, makeObservable, observable} from 'mobx'
import FakeAPI from '../models/FakeAPI'
import HeaderCardModel from '../models/HeaderCardModel'

/* Timetable Header Cards In-Memory Local Storage */
class HeaderCardStore {
  @observable headerCardList: HeaderCardModel[] = []
  @observable currentHeaderCardId: number | null = null
  @observable audienceNumber: string = ''

  // for MobX version 6
  constructor() {
      makeObservable(this)
  }

  @action fetchHeaderCardList (): void {
    this.headerCardList.length = 0
    this.headerCardList.unshift(
      ...FakeAPI.headerCardList
    )
  }
  @action setHeaderCardNumber (audienceNumber: string): void {
    this.audienceNumber = audienceNumber
  }
  @action setCurrentHeaderCardId (id: number | null): void {
    this.currentHeaderCardId = id
    if (id) {
      const currentHeaderCard =
        this.headerCardList.find(hCard => hCard.id === this.currentHeaderCardId) ?? null
      if (currentHeaderCard) {
        this.audienceNumber = currentHeaderCard.audienceNumber
      }
    } else {
      this.audienceNumber = ''
    }
  }
  @action saveHeaderCard (): void {
    // add a new item
    if(!this.currentHeaderCardId) {
      FakeAPI.headerCardList.push(
        new HeaderCardModel(this.audienceNumber)
      )
    } else {
      // edit selected item
      const currentHeaderCard =
        FakeAPI.headerCardList.find(todo => todo.id === this.currentHeaderCardId) ?? null
      if (currentHeaderCard) {
        currentHeaderCard.audienceNumber = this.audienceNumber
      }
    }
    this.setCurrentHeaderCardId(null)
    this.fetchHeaderCardList()
  }
  @action deleteHeaderCard (): void {
    if(this.currentHeaderCardId) {
      // delete selected item
      FakeAPI.headerCardList.splice(
        FakeAPI.headerCardList.findIndex(headerCard => headerCard.id === this.currentHeaderCardId),
        1
      )
      this.setCurrentHeaderCardId(null)
      this.fetchHeaderCardList()
    }
    
  }
}

export { HeaderCardStore }
export default new HeaderCardStore()