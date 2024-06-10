import { z } from 'zod'
import type { Category } from './Category'
import { dateSchema, type RPGDate } from './Date'

export interface CalendarEvent {
  id?: number
  title: string
  location?: string
  startDate: RPGDate
  endDate?: RPGDate
  description?: string
  category?: Category
  secondaryCategories?: Category[]
  hidden?: boolean
  wiki?: string
}

/**
 * Body validation schema for post requests (insert and update)
 */
export const postEventBodySchema = z.object({
  event: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    startDate: dateSchema.required(),
    endDate: dateSchema.optional().nullable(),
    hidden: z.boolean().optional().nullable(),
    category: z.object({
      id: z.number().int()
    }),
  }),
  calendarId: z.number({ coerce: true }).int().positive()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCalendarEvent(object: any): object is CalendarEvent {
  return 'startDate' in object
}
