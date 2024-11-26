import { z } from "zod"

export interface RPGDate {
  day: number
  month: number
  year: number
}

export type RPGDateOrder = "asc" | "desc"

export const dateSchema = z.object({
  day: z.number().int().positive(),
  month: z.number().int(),
  year: z.number().int()
})
