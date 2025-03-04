import { z } from "zod"
import type { Calendar } from "./CalendarConfig"
import { rpgColorSchema, type RPGColor } from "./Color"
import type { ContentState } from "./Entity"

export interface World {
  id?: number
  name: string
  description?: string
  color?: RPGColor
  calendars?: Calendar[]
  gmId?: string
  state?: ContentState
  createdAt?: string
  updatedAt?: string
}

export const postWorldSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  color: rpgColorSchema.default("white"),
  gmId: z.string().optional().nullable(),
  state: z.string().optional().nullable().default("draft"),
})
