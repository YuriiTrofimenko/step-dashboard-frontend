export default class GroupModel {
  public id?: number
  public name: string | null
  constructor (name: string | null, id?: number) {
    this.id = id
    this.name = name
  }
}