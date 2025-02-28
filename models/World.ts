import { z } from "zod"
import type { Calendar } from "./CalendarConfig"
import { rpgColorSchema, type RPGColor } from "./Color"

export type WorldState = "published" | "draft" | "archived"

export interface World {
  id?: number
  name: string
  description?: string
  color?: RPGColor,
  calendars?: Calendar[],
  gmId?: string
  state?: WorldState
}

export const postWorldSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  color: rpgColorSchema,
  gmId: z.string().optional().nullable(),
  state: z.string().optional().nullable().default("draft"),
})
