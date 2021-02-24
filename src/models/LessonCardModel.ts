export default class LessonCardModel {
  private static lastId = 0
  public id?: number
  public audienceNumber: string | null
  public groupId: number | null
  public lecturerId: number | null
  public quantity: number | null
  constructor (
    audienceNumber: string | null,
    groupId: number | null,
    lecturerId: number | null,
    quantity: number = 1,
    id?: number
    ) {
      if (id) {
        this.id = id
      } else {
        this.id = ++LessonCardModel.lastId
      }
      this.audienceNumber = audienceNumber
      this.groupId = groupId
      this.lecturerId = lecturerId
      this.quantity = quantity
  }
}