import { z } from "zod"
import type { CalendarEvent } from "./CalendarEvent"
import { calendarMonthSchema, type CalendarMonth } from "./CalendarMonth"
import { dateSchema, type RPGDate } from "./Date"
import type { World } from "./World"
import type { ContentState } from "./Entity"
import type { RPGColor } from "./Color"
import type { Category } from "./Category"

export interface CalendarConfig {
  months: CalendarMonth[]
  today: RPGDate
}

export interface Calendar extends CalendarConfig {
  id?: number
  shortId?: string
  name: string
  events: CalendarEvent[],
  categories: Category[]
  eventNb?: Array<{ count: number }>
  state: ContentState
  color?: RPGColor
  world?: World
  createdAt?: string
  updatedAt?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CalendarChannelPayload = Calendar & Record<string, any>

export const postCalendarSchema = z.object({
  name: z.string(),
  today: dateSchema.optional().nullable(),
  color: z.string().optional().nullable(),
  months: z.array(calendarMonthSchema).min(1),
  worldId: z.number().int(),
  state: z.string().optional().nullable().default("draft"),
})
