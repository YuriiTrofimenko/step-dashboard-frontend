import {action, makeObservable, observable} from 'mobx'
import HeaderCardModel from '../models/HeaderCardModel'

/* Timetable Header Cards In-Memory Local Storage */
class HeaderCardStore {
  @observable headerCardList: HeaderCardModel[] = []
  @observable currentHeaderCard: HeaderCardModel | null = null
  @observable audienceNumber: string | null = null

  // for MobX version 6
  constructor() {
      makeObservable(this)
  }

  @action fetchHeaderCardList (): void {
    this.headerCardList.length = 0
    this.headerCardList.unshift(
      new HeaderCardModel('201'),
      new HeaderCardModel('202'),
      new HeaderCardModel('204'),
      new HeaderCardModel('205'),
      new HeaderCardModel('206'),
      new HeaderCardModel('207'),
      new HeaderCardModel('208'),
      new HeaderCardModel('210'),
      new HeaderCardModel('211'),
      new HeaderCardModel('212'),
      new HeaderCardModel('213'),
      new HeaderCardModel('214'),
      new HeaderCardModel('215'),
      new HeaderCardModel('217'),
      new HeaderCardModel('217a'),
      new HeaderCardModel('218'),
      new HeaderCardModel('218a')
    )
  }
  @action setHeaderCardNumber (audienceNumber: string): void {
    this.audienceNumber = audienceNumber
  }
  @action addHeaderCard (): void {
    this.headerCardList.unshift(
      new HeaderCardModel(this.audienceNumber)
    )
  }
}

export { HeaderCardStore }
export default new HeaderCardStore()