import type { LeimDate } from './Date'

export interface Character {
  name: string
  description?: string
  birth?: LeimDate
  death?: LeimDate
  hiddenBirth?: boolean
  hiddenDeath?: boolean
}

export function isCharacter(object: any): object is Character {
  return 'birth' in object
}
