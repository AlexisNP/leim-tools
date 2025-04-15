import { z } from "zod"
import type { RPGColor } from "./Color"

export interface Category {
  id?: number
  name: string
  color?: RPGColor
}

export const categorySchema = z.object({
  category: z.object({
    name: z.string(),
    color: z.string().default("black"),
  }),
  calendarId: z.number({ coerce: true }).int().positive()
})
