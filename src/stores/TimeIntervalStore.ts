import {action, makeObservable, observable} from 'mobx'
import headerCardStore from './HeaderCardStore'
import LessonCardModel from '../models/LessonCardModel'
import TimeIntervalModel from '../models/TimeIntervalModel'
import FakeAPI from '../models/FakeAPI'
// import GroupModel from '../models/GroupModel'
// import LecturerModel from '../models/LecturerModel'

/* Timetable Header Cards In-Memory Local Storage */
class TimeIntervalStore {
  // top level properties 
  @observable timeIntervalList: TimeIntervalModel[] = []
  @observable selectedTimeInterval: TimeIntervalModel | null = null
  @observable currentTimeIntervalId: number | null = 2
  @observable intervalStart: string | null = null
  @observable intervalEnd: string | null = null
  // lesson card properties
  @observable selectedLessonCard: LessonCardModel = new LessonCardModel(null, null, null)
  @observable selectedTimeIntervalId: number | null = null
  @observable lessonCardGroupId: number | null = null
  @observable lessonCardLecturerId: number | null = null

  // for MobX version 6
  constructor() {
      makeObservable(this)
  }

  @action fetchTimeIntervalList (): void {
    /* const timeRanges = [
      {start: '9.00', end: '10:20'},
      {start: '10.00', end: '11:50'},
      {start: '12.00', end: '13:20'},
      {start: '13.30', end: '14:50'},
      {start: '15.00', end: '16:20'},
      {start: '16.30', end: '17:50'},
      {start: '18.00', end: '19:20'},
      {start: '19.30', end: '20:50'},
      {start: '21.00', end: '22:20'},
    ] */
    // TODO fetch time interval list from the rest api
    const timeIntervalListStub: TimeIntervalModel[] =
      Object.assign([], FakeAPI.timeIntervalList)
    this.timeIntervalList.length = 0
    timeIntervalListStub.forEach((timeInterval) => {
      headerCardStore.headerCardList.forEach((headerCardModel) => {
        const lessonCard = timeInterval.lessonCards.find(
          lesson => lesson.audienceNumber === headerCardModel.audienceNumber
        )
        if (!lessonCard) {
          timeInterval.lessonCards.unshift(
            new LessonCardModel(headerCardModel.audienceNumber, null, null)
          )
        }
      })
      timeInterval.lessonCards =
        timeInterval.lessonCards.sort(
          (a, b) => (a.audienceNumber ?? '').localeCompare(b.audienceNumber ?? '')
        )
    })
    this.timeIntervalList.unshift(...timeIntervalListStub)
  }
  @action setTimeIntervalStart (start: string): void {
    this.intervalStart = start
  }
  @action setTimeIntervalEnd (end: string): void {
    this.intervalEnd = end
  }
  @action addTimeInterval (): void {
    if (this.intervalStart && this.intervalEnd) {
      this.timeIntervalList.unshift(
        new TimeIntervalModel(this.intervalStart, this.intervalEnd)
      )
    }
  }
  @action setSelectedLessonCard (timeIntervalId: number | null, selectedLessonId: number | null): void {
    if (timeIntervalId && selectedLessonId) {
      this.selectedTimeIntervalId = timeIntervalId
      this.selectedLessonCard =
        this.timeIntervalList.find(timeInterval => timeInterval.id === timeIntervalId)
          ?.lessonCards.find(lessonCard => lessonCard.id === selectedLessonId) ?? new LessonCardModel(null, null, null)
      this.lessonCardGroupId = this.selectedLessonCard.groupId
      this.lessonCardLecturerId = this.selectedLessonCard.lecturerId
    }
  }
  @action unsetSelectedLessonCard (): void {
    this.selectedLessonCard = new LessonCardModel(null, null, null)
    this.lessonCardGroupId = null
    this.lessonCardLecturerId = null
    this.selectedTimeIntervalId = null
  }
  @action setLessonCardGroupId (lessonCardGroupId: number | null): void {
    this.lessonCardGroupId = lessonCardGroupId
    this.selectedLessonCard.groupId = lessonCardGroupId
  }
  @action setLessonCardLecturerId (lessonCardLecturerId: number | null): void {
    this.lessonCardLecturerId = lessonCardLecturerId
    this.selectedLessonCard.lecturerId = lessonCardLecturerId
  }
  @action saveLessonCard (): void {
    if (this.selectedLessonCard?.id && this.selectedTimeIntervalId) {
      const fakeLesson =
        FakeAPI.timeIntervalList.find(t => t.id === this.selectedTimeIntervalId)
          ?.lessonCards.find(l => l.id === this.selectedLessonCard?.id)
      if (fakeLesson) {
        fakeLesson.groupId = this.selectedLessonCard.groupId
        fakeLesson.lecturerId = this.selectedLessonCard.lecturerId
        this.fetchTimeIntervalList()
      }
    }
  }
}

export { TimeIntervalStore }
export default new TimeIntervalStore()