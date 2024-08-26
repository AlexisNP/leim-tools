import type { Calendar } from "./CalendarConfig"

export interface World {
  id: number
  uuid: string
  name: string
  description?: string
  color?: string,
  calendars?: Calendar[]
}
