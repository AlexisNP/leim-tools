import type { CalendarEvent } from '@/models/Events'
import { defineStore } from 'pinia'
import { computed, ref, watch, type Ref } from 'vue'
import { useCalendar } from './calendar'
import { useCharacters } from './characters'

export const useCalendarEvents = defineStore('calendar-events', () => {
  const { currentDate, currentConfig } = useCalendar()
  const { charactersWithBirthData, charactersWithDeathData } = useCharacters()

  const baseEvents = ref<CalendarEvent[]>([
    {
      title: "Arrivée d'aventuriers à Borélis",
      date: { day: 12, month: 7, year: 3209, period: 'nante' },
      description:
        'Tara Belyus, Vascylly et Adol Sulvan livrent 3 condamnés à Handany. Ils partent pour la mer durant la journée.',
      category: 'player'
    },
    {
      title: "Naufrage de l'Éclipse",
      description:
        "L'Éclipse, le navire de la garde contenant des condamnés à destination des Cages Handaniennes, s'échoue au large des côtes montagneuses de la Lance d'Aldys.",
      date: { day: 14, month: 7, year: 3209, period: 'nante' },
      category: 'catastrophe'
    },
    {
      title: 'Sulvan et Anastael atteignent Bamast',
      date: { day: 19, month: 2, year: 3210, period: 'nante' },
      category: 'player'
    },
    {
      title: 'Jugement de Bormis Griloup',
      description:
        "Bromis Griloup est jugé coupable d'escroquerie et sabotage aux Cours d'Acier de Tourgrise. Il purgera une peine de 10 ans au sein des prisons royales.",
      date: { day: 4, month: 8, year: 3209, period: 'nante' },
      category: 'legal'
    }
  ])

  const characterBirthEvents = computed(() => {
    return charactersWithBirthData.map((character) => {
      return {
        title: `Naissance de ${character.name}`,
        date: character.birth,
        category: 'birth'
      } as CalendarEvent
    })
  })

  const characterDeathEvents = computed(() => {
    return charactersWithDeathData.map((character) => {
      return {
        title: `Décès de ${character.name}`,
        date: character.death,
        category: 'death'
      } as CalendarEvent
    })
  })

  const allEvents = computed(() => {
    return [...characterBirthEvents.value, ...characterDeathEvents.value, ...baseEvents.value]
  })

  // Gets all current event in its default state
  const currentEvents: Ref<CalendarEvent[]> = ref(computeCurrentEvents())

  // Watch for currentDate changes
  watch(currentDate, () => {
    currentEvents.value = computeCurrentEvents()
  })

  /**
   * Determines if the event can appear in the front end
   *
   * This function takes into consideration the viewType of the calendar config
   *
   * @param event The event to analyze
   * @returns Whether the event should appear in the current view
   */
  function shouldEventBeDisplayed(event: CalendarEvent): boolean {
    switch (currentConfig.viewType) {
      case 'month':
        return (
          event.date.month === currentDate.currentMonth ||
          (event.date.month === currentDate.currentMonth + 1 && event.date.day <= 8) // This is to allow leap events from appearing on the last 8 tiles
        )

      case 'year':
        return event.date.year === currentDate.currentYear

      case 'decade':
        return (
          event.date.year >= currentDate.currentYear &&
          event.date.year <= currentDate.currentYear + 10
        )

      case 'century':
        return (
          event.date.year >= currentDate.currentYear &&
          event.date.year <= currentDate.currentYear + 100
        )

      default:
        return false
    }
  }

  /**
   * Fetches all the current events for the current view
   *
   * @returns A list of events that can appear in the current view
   */
  function computeCurrentEvents(): CalendarEvent[] {
    return allEvents.value.filter((event) => shouldEventBeDisplayed(event))
  }

  return { baseEvents, allEvents, currentEvents }
})
