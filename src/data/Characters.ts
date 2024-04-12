import type { Character } from '@/models/Characters'

export const charactersList: Character[] = [
  /**
   * Player characters
   */
  // "Les Milles Cages"
  { name: 'Sulvan Trois-Barbes', birth: { day: 20, month: 3, year: 3169 } },
  { name: 'Vascylly', birth: { day: 3, month: 5, year: 3181 } },
  { name: 'Tara Belyus', birth: { day: 14, month: 9, year: 3186 } },
  // "Les Cloches de Cantane"
  { name: 'Malik', birth: { day: 22, month: 8, year: 3181 } },
  { name: 'Elie', birth: { day: 5, month: 6, year: 3192 } },
  { name: 'Clayron', birth: { day: 3, month: 5, year: 3178 } },

  /**
   * NPC
   */
  // Counts of the Alliance
  { name: 'Alfrid de Lagarde', birth: { day: 29, month: 7, year: 3193 } },
  { name: 'Alaric de Lagarde', birth: { day: 23, month: 8, year: 3192 } },
  { name: 'Anastael III de Quillon', birth: { day: 1, month: 5, year: 3184 } },
  { name: 'Antoine de Mireloin', birth: { day: 31, month: 5, year: 3190 } },
  { name: 'Armance Ronchère', birth: { day: 1, month: 1, year: 3132 } },
  { name: 'Baranne Rougefer', birth: { day: 1, month: 0, year: 3175 } },
  { name: 'Béatrice II de Grandlac', birth: { day: 21, month: 4, year: 3158 } },
  { name: 'Favio Asharos-Losantelle', birth: { day: 17, month: 3, year: 3091 } },
  { name: 'Firmin de Montardieu', birth: { day: 9, month: 2, year: 3203 } },
  {
    name: 'Laura de Montardieu',
    birth: { day: 32, month: 3, year: 3167 },
    death: { day: 1, month: 4, year: 3217 },
    hiddenDeath: true
  },
  { name: 'Lazarus Tymos', birth: { day: 29, month: 9, year: 3145 } },
  { name: 'Marion de Corambre', birth: { day: 14, month: 7, year: 3190 } },
  { name: 'Relforg Pergaré', birth: { day: 18, month: 9, year: 3182 } },
  { name: 'Vilgarde de Ternâcre', birth: { day: 3, month: 3, year: 2998 } },
  { name: 'Ysildy Milopée', birth: { day: 3, month: 1, year: 3187 } },

  // Sparks
  { name: 'Izàc Tymos', birth: { day: 13, month: 6, year: 3192 } },
  { name: 'Tvernée', birth: { day: 19, month: 2, year: 3205 } },

  // Pirates
  { name: 'Räzal', birth: { day: 13, month: 8, year: 3178 } },

  // "Les Milles Cages"
  { name: 'Ernestin Pomel', birth: { day: 11, month: 2, year: 3179 } },
  { name: 'Quacille Lévios', birth: { day: 3, month: 6, year: 3162 } },
  { name: 'Morel Lévios', birth: { day: 26, month: 3, year: 3157 } },
  { name: 'Anastael Simon', birth: { day: 32, month: 2, year: 3166 } },
  { name: 'Grestain', birth: { day: 9, month: 2, year: 3162 } },
  { name: 'Lucien Malanth', birth: { day: 31, month: 4, year: 3167 } },
  { name: 'Tivian Rodhus', birth: { day: 13, month: 3, year: 3157 } },

  // "Les Cloches de Cantane"
  {
    name: 'Bénédicte Vaht',
    description: "Moine d'Ikami ayant entrepris la construction du Pilier Blanc de Cantane",
    birth: { day: 28, month: 6, year: 3139 }
  },
  {
    name: 'Taleb Vaht',
    description:
      "Fils de Bénédicte, il s'est engagé auprès des Étincelles comme alchimiste artificier.",
    birth: { day: 9, month: 1, year: 3180 },
    death: { day: 28, month: 7, year: 3209 }
  }
]
