export default class HeaderCardModel {
  public id?: number
  public audienceNumber: string | null
  constructor (audienceNumber: string | null, id?: number) {
    this.id = id
    this.audienceNumber = audienceNumber
  }
}