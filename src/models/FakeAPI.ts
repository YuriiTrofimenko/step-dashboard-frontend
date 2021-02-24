import GroupModel from "./GroupModel";
import LecturerModel from "./LecturerModel";
import LessonCardModel from "./LessonCardModel";
import TimeIntervalModel from "./TimeIntervalModel";

export default class FakeAPI {
  public static groupList: GroupModel[] = [
    new GroupModel('ПД 911', 1),
    new GroupModel('1013', 2),
    new GroupModel('1012', 3),
    new GroupModel('МА 10-30', 4),
    new GroupModel('3022', 5),
    new GroupModel('АСВ 31-18', 6)
  ]
  public static lecturerList: LecturerModel[] = [
    new LecturerModel('Юрий Валериевич', 1),
    new LecturerModel('Елена Валерьевна', 2),
    new LecturerModel('Оксана Владимировна', 3),
    new LecturerModel('Максим Константинович', 4),
    new LecturerModel('Татьяна Владимировна', 5),
    new LecturerModel('Михаил Анатольевич', 6)
  ]
  public static timeIntervalList: TimeIntervalModel[] = [
    new TimeIntervalModel(
      '15:00',
      '16:20',
      [
        new LessonCardModel('205', 1, 1),
        new LessonCardModel('207', 2, 2),
        new LessonCardModel('208', 3, 3)
      ]
    ),
    new TimeIntervalModel(
      '16:30',
      '17:50',
      [
        new LessonCardModel('201', 4, 4),
        new LessonCardModel('211', 5, 5),
        new LessonCardModel('212', 6, 6)
      ]
    )
  ]
}