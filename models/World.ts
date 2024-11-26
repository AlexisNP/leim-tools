import { z } from "zod"
import type { Calendar } from "./CalendarConfig"
import { rpgColorSchema, type RPGColor } from "./Color"

export interface World {
  id?: number
  name: string
  description?: string
  color?: RPGColor,
  calendars?: Calendar[],
  gmId?: string
}

export const postWorldSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  color: rpgColorSchema,
  gmId: z.string().optional().nullable(),
})
