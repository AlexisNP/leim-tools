import { z } from 'zod'

export interface Category {
  id: number
  name: string
}

export const categorySchema = z.object({
  id: z.number().int(),
  name: z.string()
})
