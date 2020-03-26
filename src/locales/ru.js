export default {
  promptLabels: {
    actionRemove:       'Вы действительно хотите удалить это занятие?',
    actionExclude:      'Вы действительно хотите удалить занятие в этот день?',
    actionCancel:       'Вы действительно хотите отменить это занятие?',
    actionUncancel:     'Are you sure you want to uncancel this event?',
    actionSetStart:     'Вы действительно хотите установить это вхождение как первое?',
    actionSetEnd:       'Вы действительно хотите установить это вхождение как последнее?',
    actionMove:         'Вы действительно хотите перенести это занятие?',
    actionInclude:      'Вы действительно хотите добавить это занятие?',
    move:               'Вы действительно хотите переместить это занятие?',
    toggleAllDay:       'Вы действительно установить это занятие на весь день?',
    removeExistingTime: 'Вы действительно хотите удалить все занятия в это время?'
  },
  placeholder: {
    noTitle: '(Название занятия)'
  },
  patterns: {
    lastDay:        (day) => 'Последний день месяца',
    lastDayOfMonth: (day) => 'Последний день ' + day.format('MMMM'),
    lastWeekday:    (day) => 'Последний ' + day.format('dddd') + ' в ' + day.format('MMMM')
  },
  colors: [
    { text: 'Красный' },
    { text: 'Розовый' },
    { text: 'Фиолетовый' },
    { text: 'Темно-фиолетовый' },
    { text: 'Индиго' },
    { text: 'Синий' },
    { text: 'Темно-синий' },
    { text: 'Голубой' },
    { text: 'Циановый' },
    { text: 'Бирюзовый' },
    { text: 'Зеленый' },
    { text: 'Светло-зеленый' },
    { text: 'Лаймовый' },
    { text: 'Желтый' },
    { text: 'Солнечный' },
    { text: 'Оранжевый' },
    { text: 'Темно-оранжевый' },
    { text: 'Коричневый' },
    { text: 'Темно-сервый' },
    { text: 'Серый' },
    { text: 'Черный' }
  ],
  icons: [
    { text: 'Будильник' },
    { text: 'Звезда' },
    { text: 'Любовь' },
    { text: 'Действие' },
    { text: 'Назначение' },
    { text: 'Предупреждение' },
    { text: 'Деньги' },
    { text: 'Зарядка' },
    { text: 'Дом' },
    { text: 'Развлечение' },
    { text: 'Почта' },
    { text: 'Телефон' },
    { text: 'График' },
    { text: 'Спорт' },
    { text: 'Путешествие' }
  ],
  defaults: {
    dsDay: {
      formats: {
        month:  'MMM'
      }
    },
    dsCalendarApp: {
      types: [
        { label: 'День' },
        { label: 'Неделя' },
        { label: 'Месяц' },
        { label: 'Год' },
        { label: 'Расписание' },
        { label: '4 дня' }
      ],
      formats: {
        today: 'dddd, MMMM D',
        xs: 'MMM'
      },
      labels: {
        next: (type) => type ? 'Следующая ' + type.label.toLowerCase() : 'Следующая',
        prev: (type) => type ? 'Предыдущая ' + type.label.toLowerCase() : 'Предыдущая',
        moveCancel: 'Отменить перемещение',
        moveSingleEvent: 'Переместить занятие',
        moveOccurrence: 'Переместить только сегодняшнее занятие',
        moveAll: 'Переместить все эти занятия',
        moveDuplicate: 'Добавить это занятие в другой день',
        promptConfirm: 'ДА',
        promptCancel: 'Нет',
        today: 'Сегодня'
      }
    },
    dsAgendaEvent: {
      formats: {
        firstLine:  'ddd',
        secondLine: 'MMM Do',
        start:      'dddd, MMMM D',
        time:       'h:mm a'
      },
      labels: {
        allDay:   'Весь день',
        options:  'Настройки',
        close:    'Закрыть',
        day:      ['день', 'дни'],
        days:     ['дни', 'дни'],
        minute:   ['минута', 'минуты'],
        minutes:  ['минуты', 'минуты'],
        hour:     ['час', 'часы'],
        hours:    ['часы', 'часы'],
        week:     ['неделя', 'недели'],
        weeks:    ['недели', 'недели'],
        second:   ['секунда', 'секунды'],
        seconds:  ['секунды', 'секунды'],
        busy:     'Занято',
        free:     'Свободно'
      }
    },
    dsCalendarEventChip: {
      formats: {
        fullDay:          'ddd MMM Do YYYY',
        timed:            'ddd MMM Do YYYY'
      }
    },
    dsCalendarEventPopover: {
      formats: {
        start:    'dddd, MMMM D',
        time:     'h:mm a'
      },
      labels: {
          allDay:   'Весь день',
          options:  'Настройки',
          close:    'Закрыть',
          day:      ['день', 'дни'],
          days:     ['дни', 'дни'],
          minute:   ['минута', 'минуты'],
          minutes:  ['минуты', 'минуты'],
          hour:     ['час', 'часы'],
          hours:    ['часы', 'часы'],
          week:     ['неделя', 'недели'],
          weeks:    ['недели', 'недели'],
          second:   ['секунда', 'секунды'],
          seconds:  ['секунды', 'секунды'],
          busy:     'Занято',
          free:     'Свободно'
      }
    },
    dsCalendarEventCreatePopover: {
      formats: {
        start:    'dddd, MMMM D',
        time:     'h:mm a'
      },
      labels: {
        title:    'Добавить название',
        allDay:   'Весь день',
        close:    'Закрыть',
        save:     'Сохранить',
      day:      ['день', 'дни'],
      days:     ['дни', 'дни'],
      minute:   ['минута', 'минуты'],
      minutes:  ['минуты', 'минуты'],
      hour:     ['час', 'часы'],
      hours:    ['часы', 'часы'],
      week:     ['неделя', 'недели'],
      weeks:    ['недели', 'недели'],
      second:   ['секунда', 'секунды'],
      seconds:  ['секунды', 'секунды'],
      busy:     'Занято',
      free:     'Свободно',
        location: 'Добавить местоположение',
        description: 'Добавить описание',
        calendar: 'Календарь',
      },
      busyOptions: [
        {text: 'Занято'},
        {text: 'Свободно'}
      ]
    },
    dsSchedule: {
      labels: {
        editCustom:   'Изменить'
      }
    },
    dsEvent: {
      labels: {
        moreActions:  'Больше действий...',
        cancel:       'Отменить изменения',
        save:         'Сохранить',
        title:        'Заголовок',
        exclusions:   'Занятия или промежутки времени, обычно происходящие в это время были исключены из графика. События исключаются, если занятие было перемещено.',
        inclusions:   'Занятия или промежутки времени были добавлены вне обычного расписания. Они добавляются сюда, если событие перенесено.',
        cancelled:    'Занятия или промежутки времени были отменены',
        edit:         'Изменить занятие',
        add:          'Добавить занятие',
        location:     'Добавить местоположение',
        description:  'Добавить описание',
        calendar:     'Календарь',
        tabs: {
          details:    'Подробнее',
          forecast:   'Прогноз',
          removed:    'Удалено',
          added:      'Добавлено',
          cancelled:  'Отменено'
        }
      },
      busyOptions: [
      {text: 'Занято'},
      {text: 'Свободно'}
      ]
    },
    dsScheduleActions: {
      labels: {
        remove:     'Удалить это занятие из расписания',
        exclude:    'Удалить это занятие (единоразово)',
        cancel:     'Отменить это вождение',
        uncancel:   'Отменить отмену',
        move:       'Переместить это занятие (единоразово)',
        include:    'Добавить занятие (единоразово)',
        setStart:   'Добавить занятие как начальное',
        setEnd:     'Добавить занятие как последнее',
        pickerOk:   'Ок',
        pickerCancel:'Отменить'
      }
    },
    dsScheduleForecast: {
      labels: {
        prefix:     'Прогноз показывает предыдущий и следующий',
        suffix:     'события в течение нескольких лет.'
      }
    },
    dsScheduleFrequencyDay: {
      labels: {
        type: 'Дни'
      },
      options: [
        { text: 'Любой день' },
        { text: 'В эти дни...' },
        { text: 'Каждый _ день начиная с _' }
      ],
      types: [
        { text: 'День месяца' },
        { text: 'Последний день месяца' },
        { text: 'День года' }
      ]
    },
    dsScheduleFrequencyDayOfWeek: {
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      labels: {
        type: 'Дни недели'
      },
      options: [
        { text: 'Любой день недели' },
        { text: 'В эти дни недели...' },
        { text: 'Каждый _ день начиная с _' },
        { text: 'Выходные дни' },
        { text: 'Будние дни' }
      ]
    },
    dsScheduleFrequencyMonth: {
      labels: {
        type: 'Месяца'
      },
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      options: [
        { text: 'Любой месяц' },
        { text: 'В следующие месяцы...' },
        { text: 'Каждый _ месяц начиная с _' }
      ]
    },

    dsScheduleFrequencyWeek: {
      labels: {
        type: 'Недели'
      },
      options: [
        { text: 'Любая неделя' },
        { text: 'В следующие недели...' },
        { text: 'Каждые _ недель начиная с _' }
      ],
      types: [
        { text: 'Неделя месяца (где первая неделя имеет четверг)' },
        { text: 'Неделя месяца (начинается в первый день месяца)' },
        { text: 'Полная неделя месяца (нулевая - если неделя перед полной)' },
        { text: 'Последняя неделя месяца(начинается в последний день месяца)' },
        { text: 'Последняя полная неделя месяца (нулевая - если неделя перед полной через неделю, если есть)' },
        { text: 'Неделя года (где первая неделя имеет четверг)' },
        { text: 'Неделя года (начинается в первый день месяца)' },
        { text: 'Полная неделя года (нулевая - если неделя перед полной)' },
        { text: 'Последняя неделя года (начинается в последний день года)' },
        { text: 'Последняя полная неделя года (нулевая неделя, если таковая имеется)' }
      ]
    },

    dsScheduleFrequencyYear: {
      labels: {
        type: 'Года'
      },
      options: [
        { text: 'Любой год' },
        { text: 'В следующие года...' },
        { text: 'Каждые _ лет начиная с _' }
      ]
    },

    dsScheduleSpan: {
      labels: {
        startless:  'Начало',
        endless:    'Окончание'
      },
      formats: {
        start:      'MMMM Do, YYYY',
        end:        'MMMM Do, YYYY'
      }
    },

    dsScheduleTime: {
      labels: {
        remove:     'Удалить время',
        add:        'Добавить время'
      }
    },

    dsScheduleTimes: {
      labels: {
        all:        'Весь день',
        minute:     'минута',
        minutes:    'минуты',
        hour:       'час',
        hours:      'часы',
        day:        'день',
        days:       'дни',
        week:       'неделя',
        weeks:      'недели',
        month:      'месяц',
        months:     'месяцы',
        second:     'секунда',
        seconds:    'секунды'
      }
    },

    dsScheduleType: {
      formats: {
        date:       'LL'
      }
    },

    dsScheduleTypeCustomDialog: {
      labels: {
        save:     'Сохранить',
        cancel:   'Отменить'
      }
    },

    dsWeekDayHeader: {
      formats: {
        weekday:    'ddd'
      }
    },

    dsWeeksView: {
      weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    },

    dsDaysView: {
      hours: [
        '    ', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
        '12:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ]
    },

    dsDayPicker: {
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      labels: {
        prevMonth: 'Предыдущий месяц',
        nextMonth: 'Следующий месяц'
      }
    }
  }
}
