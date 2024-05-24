import type { CalendarEvent } from "./CalendarEvent"
import type { CalendarMonth } from "./CalendarMonth"
import type { RPGDate } from "./Date"

export interface CalendarConfig {
  months: CalendarMonth[]
  daysPerMonth: number
  today: RPGDate
}

export interface Calendar extends CalendarConfig {
  id: number
  name: string
  events: CalendarEvent[]
}
