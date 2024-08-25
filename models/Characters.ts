import type { Category } from "./Category"
import type { RPGDate } from "./Date"

export interface Character {
  name: string
  description?: string
  birth?: RPGDate
  death?: RPGDate
  hiddenBirth?: boolean
  hiddenDeath?: boolean
  category?: Category
  secondaryCategories?: Category[]
  wiki?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCharacter(object: any): object is Character {
  return "birth" in object
}
