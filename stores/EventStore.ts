import type { CalendarEvent } from "@/models/CalendarEvent"
import type { RPGDate } from "@/models/Date"
import { defineStore } from "pinia"
import { ref, watch, type Ref } from "vue"
import type { Category } from "~/models/Category"
import { useCalendar } from "./CalendarStore"

export const useCalendarEvents = defineStore("calendar-events", () => {
  const { activeCalendar, defaultDate, currentConfig, convertDateToDays, compareDates } = useCalendar()
  const { currentRPGDate } = storeToRefs(useCalendar())

  const baseEvents = ref<CalendarEvent[]>([])

  async function fetchCalendarEvents(calendarId: number) {
    try {
      const res = await $fetch("/api/calendars/events/query", { query: { calendarId } })

      const eventData = res.data as CalendarEvent[]

      if (!eventData.length) return

      baseEvents.value = eventData
    } catch (err) {
      console.log(err)
    }
  }

  const categories = ref<Category[]>([])

  function setCategories(data: Category[]) {
    categories.value = data
  }

  // Order base events by dates
  const allEvents = computed(() => baseEvents.value.sort((a, b) => {
    return compareDates(a.startDate, b.startDate, "desc")
  }))

  // Gets all current event in its default state
  const currentEvents: Ref<CalendarEvent[]> = ref([])

  // Watch for currentDate or events' list changes
  // This is deep because we're watching an array, and changes need to trigger and mutations like .push and .splice
  watch([currentRPGDate, allEvents], () => {
    currentEvents.value = computeCurrentEvents()
  }, { deep: true, immediate: true })

  /**
   * Determines if the event can appear in the front end
   *
   * This function takes into consideration the viewType of the calendar config
   *
   * @param event The event to analyze
   * @returns Whether the event should appear in the current view
   */
  function shouldEventBeDisplayed(event: CalendarEvent): boolean {
    const isEventOnCurrentScreen =
      (event.startDate.year === currentRPGDate.value.day &&
        event.startDate.month === currentRPGDate.value.month) ||
      (event.endDate &&
        event.endDate.year === currentRPGDate.value.year &&
        event.endDate.month === currentRPGDate.value.month)

    switch (currentConfig.viewType) {
      case "month":
        return isEventOnCurrentScreen!

      case "year":
        return event.startDate.year === currentRPGDate.value.year

      case "decade":
        return (
          event.startDate.year >= currentRPGDate.value.year &&
          event.startDate.year <= currentRPGDate.value.year + 10
        )

      case "century":
        return (
          event.startDate.year >= currentRPGDate.value.year &&
          event.startDate.year <= currentRPGDate.value.year + 100
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

  /**
   * From a base event, gets the next or previous one in the timeline
   *
   * @param event The event at a given position in the data
   * @param position Whether we should get the next or previous event
   * @returns The next event in chronological order
   */
  function getRelativeEventFromEvent(
    event: CalendarEvent,
    position: "next" | "prev" = "next",
    initialIsEnd: boolean = false
  ): { event: CalendarEvent; targetDate: RPGDate } {
    let dateToParse: RPGDate // Day value of the date that the user interacted with

    if (initialIsEnd && event.endDate) {
      dateToParse = event.endDate
    } else {
      dateToParse = event.startDate
    }

    return getRelativeEventFromDate(dateToParse, position)
  }

  /**
   * From a date, gets the next or previous event in the timeline
   *
   * @param date The starting date from which to get the next event
   * @param position Whether we should get the next or previous event
   * @returns The next event in chronological order
   */
  function getRelativeEventFromDate(
    date: RPGDate,
    position: "next" | "prev" = "next"
  ): { event: CalendarEvent; targetDate: RPGDate } {
    const pivotValue = convertDateToDays(date)
    let t: { eventData: CalendarEvent; distance: number; targetKey: "startDate" | "endDate" }[] = []

    // Loop over all event once to convert the structure to a usable one
    for (let i = 0; i < allEvents.value.length; i++) {
      const e: CalendarEvent = allEvents.value[i]

      // Estimate distance from pivot
      const startDateDays: number = convertDateToDays(e.startDate)
      const startDistance: number = startDateDays - pivotValue

      // Push startDate to comparator array
      t.push({
        eventData: e,
        distance: startDistance,
        targetKey: "startDate"
      })

      // Check the same things for endDate
      if (e.endDate) {
        const endDateDays: number = convertDateToDays(e.endDate)
        const endDistance: number = endDateDays - pivotValue

        // Push optional endDate to comparator array
        t.push({
          eventData: e,
          distance: endDistance,
          targetKey: "endDate"
        })
      }
    }

    // Based on the direction, either ignore negative distance (past) or positive distance (future)
    t = t.filter((i) => {
      return position === "next" ? i.distance > 0 : i.distance < 0
    })

    if (!t.length) {
      throw new Error(
        "Aucun évènement suivant ou précédent trouvé ; Peut-être l'évènement se situe au début ou à la fin du calendrier ?"
      )
    }

    // Get event with remaining minimum distance
    const closestEvent = t.reduce((a, b) => {
      return Math.abs(b.distance) < Math.abs(a.distance) ? b : a
    })

    return {
      event: closestEvent.eventData,
      targetDate: closestEvent.eventData[closestEvent.targetKey]!
    }
  }

  /**
   * State for event modal edition
   */
  const isEditEventModalOpen: Ref<boolean> = ref<boolean>(false)

  function revealEditEventModal() {
    isEditEventModalOpen.value = true
  }

  /**
   * State for event modal edition
   */
  const isDeleteEventModalOpen: Ref<boolean> = ref<boolean>(false)

  function revealDeleteEventModal() {
    isDeleteEventModalOpen.value = true
  }

  /**
   * EVENT CREATION FUNCTIONS
   */
  const lastActiveEvent = ref<CalendarEvent | null>()
  const isCreatingEvent = ref<boolean>(false)
  const isUpdatingEvent = ref<boolean>(false)
  const isDeletingEvent = ref<boolean>(false)
  const operationInProgress = computed(() => isCreatingEvent.value || isUpdatingEvent.value || isDeletingEvent.value)
  let abortController: AbortController | null = null

  /**
   * Dummy event to hold creation data
   */
  const eventSkeleton: Ref<CalendarEvent> = ref<CalendarEvent>({ title: "", startDate: defaultDate })

  /**
   * Resets the dummy event data
   */
  function resetSkeleton() {
    eventSkeleton.value = { title: "", startDate: defaultDate }
  }

  /**
   * Submits the skeleton event and creates a real event from its data
   *
   * We assume it's been sanitized by the caller
   */
  async function submitSkeleton() {
    abortController = new AbortController()
    isCreatingEvent.value = true

    try {
      const res = await $fetch("/api/calendars/events/create", { method: "POST", body: { event : eventSkeleton.value, calendarId: activeCalendar?.id }, signal: abortController.signal })

      baseEvents.value.push(res)
    } catch (err) {
      console.log(err)
    } finally {
      abortController = null
      isCreatingEvent.value = false
    }
  }

  async function updateEventFromSkeleton() {
    abortController = new AbortController()
    isUpdatingEvent.value = true

    const res = await $fetch(`/api/calendars/events/${eventSkeleton.value.id}`, { method: "PATCH", body: { event : eventSkeleton.value, calendarId: activeCalendar?.id }, signal: abortController.signal })

    const eventIndex = baseEvents.value.findIndex(e => e.id === eventSkeleton.value.id)
    baseEvents.value[eventIndex] = res

    abortController = null
    isUpdatingEvent.value = false
  }

  async function deleteEventFromSkeleton() {
    abortController = new AbortController()
    isDeletingEvent.value = true

    try {
      await $fetch(`/api/calendars/events/${eventSkeleton.value.id}`, { method: "DELETE", signal: abortController.signal })

      const eventIndex = baseEvents.value.findIndex(e => e.id === eventSkeleton.value.id)
      baseEvents.value.splice(eventIndex, 1)
    } catch (err) {
      console.log(err)
    } finally {
      abortController = null
      isDeletingEvent.value = false
    }
  }

  function cancelLatestRequest() {
    if (abortController) {
      abortController.abort()
    }
  }

  return {
    allEvents,
    fetchCalendarEvents,
    categories,
    setCategories,
    currentEvents,
    getRelativeEventFromDate,
    getRelativeEventFromEvent,
    cancelLatestRequest,
    isCreatingEvent,
    isUpdatingEvent,
    isDeletingEvent,
    operationInProgress,
    eventSkeleton,
    resetSkeleton,
    submitSkeleton,
    lastActiveEvent,
    updateEventFromSkeleton,
    deleteEventFromSkeleton,
    isEditEventModalOpen,
    revealEditEventModal,
    isDeleteEventModalOpen,
    revealDeleteEventModal
  }
})
