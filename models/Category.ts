import { z } from "zod"
import type { RPGColor } from "./Color"

export interface Category {
  id: number
  name: string
  color?: RPGColor
}

export const categorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  color: z.string().default("black")
})
