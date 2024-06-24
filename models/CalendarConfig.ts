import { z } from 'zod'
import type { CalendarEvent } from "./CalendarEvent"
import { type CalendarMonth } from "./CalendarMonth"
import { dateSchema, type RPGDate } from "./Date"

export interface CalendarConfig {
  months: CalendarMonth[]
  today: RPGDate
}

export interface Calendar extends CalendarConfig {
  id?: number
  name: string
  events: CalendarEvent[]
  color?: string,
}

export const postCalendarSchema = z.object({
  name: z.string(),
  today: dateSchema.optional().nullable(),
  color: z.string().optional().nullable(),
  worldId: z.number().int(),
})
