export default class HeaderCardModel {
  private static lastId = 0
  public id?: number
  public audienceNumber: string
  constructor (audienceNumber: string, id?: number) {
    if (id) {
      this.id = id
    } else {
      this.id = ++HeaderCardModel.lastId
    }
    this.audienceNumber = audienceNumber
  }
}