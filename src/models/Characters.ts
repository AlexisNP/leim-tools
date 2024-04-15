import type { LeimDate } from './Date'

export interface Character {
  name: string
  description?: string
  birth?: LeimDate
  death?: LeimDate
  hiddenBirth?: boolean
  hiddenDeath?: boolean
  category?: CharacterCategory
  secondaryCategories?: CharacterCategory[]
  wiki?: string
}

export type CharacterCategory =
  | 'joueur'
  | 'comte'
  | 'scientifique'
  | 'mage'
  | 'professeur'
  | 'criminel'
  | 'étincelle'
  | 'buse blanche'
  | 'ecclésiastique'
  | 'sentinelle'

export function isCharacter(object: any): object is Character {
  return 'birth' in object
}
