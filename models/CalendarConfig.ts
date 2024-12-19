import { z } from "zod"
import type { CalendarEvent } from "./CalendarEvent"
import { calendarMonthSchema, type CalendarMonth } from "./CalendarMonth"
import { dateSchema, type RPGDate } from "./Date"
import type { World } from "./World"

export type CalendarState = "published" | "draft" | "archived"

export interface CalendarConfig {
  months: CalendarMonth[]
  today: RPGDate
}

export interface Calendar extends CalendarConfig {
  id?: number
  shortId?: string
  name: string
  events: CalendarEvent[]
  state: CalendarState
  color?: string
  world?: World
}

export const postCalendarSchema = z.object({
  name: z.string(),
  today: dateSchema.optional().nullable(),
  color: z.string().optional().nullable(),
  months: z.array(calendarMonthSchema).min(1),
  worldId: z.number().int(),
})
