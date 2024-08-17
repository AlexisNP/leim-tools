import { z } from 'zod'

export interface CalendarMonth {
  id?: number
  days: number,
  name: string,
  position: number,
}

export const calendarMonthSchema = z.object({
  name: z.string().max(64),
  days: z.number().int().min(12),
  position: z.number().int().optional().nullable(),
  calendar_id: z.number().int().optional().nullable()
})
