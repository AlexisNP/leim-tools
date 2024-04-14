import type { Character } from '@/models/Characters'

export const charactersList: Character[] = [
  /**
   * Player characters
   */
  // "Les Milles Cages"
  {
    name: 'Sulvan Trois-Barbes',
    birth: { day: 20, month: 3, year: 3169 },
    wiki: 'https://alexcreates.fr/leim/index.php/Sulvan_Trois-Barbes'
  },
  {
    name: 'Vascylly',
    birth: { day: 3, month: 5, year: 3181 },
    category: 'joueur',
    wiki: 'https://alexcreates.fr/leim/index.php/Vascylly'
  },
  { name: 'Tara Belyus', birth: { day: 14, month: 9, year: 3186 } },
  // "Les Cloches de Cantane"
  { name: 'Malik', birth: { day: 22, month: 8, year: 3181 } },
  { name: 'Elie', birth: { day: 5, month: 6, year: 3192 } },
  { name: 'Clayron', birth: { day: 3, month: 5, year: 3178 } },

  /**
   * NPC
   */
  // Counts of the Alliance
  {
    name: 'Alfrid de Lagarde',
    birth: { day: 29, month: 7, year: 3193 },
    wiki: 'https://alexcreates.fr/leim/index.php/Alfrid_de_Lagarde'
  },
  {
    name: 'Alaric de Lagarde',
    birth: { day: 23, month: 8, year: 3192 },
    wiki: 'https://alexcreates.fr/leim/index.php/Alaric_de_Lagarde'
  },
  {
    name: 'Anastael III de Quillon',
    birth: { day: 1, month: 5, year: 3184 },
    wiki: 'https://alexcreates.fr/leim/index.php/Anastael_III_de_Quillon'
  },
  {
    name: 'Antoine de Mireloin',
    birth: { day: 31, month: 5, year: 3190 },
    wiki: 'https://alexcreates.fr/leim/index.php/Antoine_de_Mireloin'
  },
  {
    name: 'Armance Ronchère',
    birth: { day: 1, month: 1, year: 3132 },
    wiki: 'https://alexcreates.fr/leim/index.php/Armance_Ronchère'
  },
  {
    name: 'Baranne Rougefer',
    birth: { day: 1, month: 0, year: 3175 },
    wiki: 'https://alexcreates.fr/leim/index.php/Baranne_Rougefer'
  },
  {
    name: 'Béatrice II de Grandlac',
    birth: { day: 21, month: 4, year: 3158 },
    wiki: 'https://alexcreates.fr/leim/index.php/Béatrice_II_de_Grandlac'
  },
  {
    name: 'Favio Asharos-Losantelle',
    birth: { day: 17, month: 3, year: 3091 },
    wiki: 'https://alexcreates.fr/leim/index.php/Favio_Asharos-Losantelle'
  },
  {
    name: 'Firmin de Montardieu',
    birth: { day: 9, month: 2, year: 3203 },
    wiki: 'https://alexcreates.fr/leim/index.php/Firmin_de_Montardieu'
  },
  {
    name: 'Laura de Montardieu',
    birth: { day: 32, month: 3, year: 3167 },
    death: { day: 1, month: 4, year: 3217 },
    hiddenDeath: true,
    wiki: 'https://alexcreates.fr/leim/index.php/Laura_de_Montardieu'
  },
  {
    name: 'Lazarus Tymos',
    birth: { day: 29, month: 9, year: 3145 },
    wiki: 'https://alexcreates.fr/leim/index.php/Lazarus_Tymos'
  },
  {
    name: 'Marion de Corambre',
    birth: { day: 14, month: 7, year: 3190 },
    wiki: 'https://alexcreates.fr/leim/index.php/Marion_de_Corambre'
  },
  {
    name: 'Relforg Pergaré',
    birth: { day: 18, month: 9, year: 3182 },
    wiki: 'https://alexcreates.fr/leim/index.php/Relforg_Pergaré'
  },
  {
    name: 'Vilgarde de Ternâcre',
    birth: { day: 3, month: 3, year: 2998 },
    wiki: 'https://alexcreates.fr/leim/index.php/Vilgarde_de_Ternâcre'
  },
  {
    name: 'Ysildy Milopée',
    birth: { day: 3, month: 1, year: 3187 },
    wiki: 'https://alexcreates.fr/leim/index.php/Ysildy_Milopée'
  },

  // Sparks
  {
    name: 'Izàc Tymos',
    birth: { day: 13, month: 6, year: 3192 },
    wiki: 'https://alexcreates.fr/leim/index.php/Izàc_Tymos'
  },
  {
    name: 'Tvernée',
    birth: { day: 19, month: 2, year: 3205 },
    wiki: 'https://alexcreates.fr/leim/index.php/Tvernée'
  },

  // Pirates
  {
    name: 'Räzal',
    birth: { day: 13, month: 8, year: 3178 },
    wiki: 'https://alexcreates.fr/leim/index.php/Räzal'
  },

  // "Les Milles Cages"
  {
    name: 'Ernestin Pomel',
    birth: { day: 11, month: 2, year: 3179 },
    wiki: 'https://alexcreates.fr/leim/index.php/Ernestin_Pomel'
  },
  {
    name: 'Quacille Lévios',
    birth: { day: 3, month: 6, year: 3162 },
    wiki: 'https://alexcreates.fr/leim/index.php/Quacille_Lévios'
  },
  {
    name: 'Morel Lévios',
    birth: { day: 26, month: 3, year: 3157 },
    wiki: 'https://alexcreates.fr/leim/index.php/Morel_Lévios'
  },
  {
    name: 'Anastael Simon',
    birth: { day: 32, month: 2, year: 3166 },
    wiki: 'https://alexcreates.fr/leim/index.php/Anastael_Simon'
  },
  {
    name: 'Grestain',
    birth: { day: 9, month: 2, year: 3162 },
    wiki: 'https://alexcreates.fr/leim/index.php/Grestain'
  },
  {
    name: 'Lucien Malanth',
    birth: { day: 31, month: 4, year: 3167 },
    wiki: 'https://alexcreates.fr/leim/index.php/Lucien_Malanth'
  },
  {
    name: 'Tivian Rodhus',
    birth: { day: 13, month: 3, year: 3157 },
    wiki: 'https://alexcreates.fr/leim/index.php/Tivian_Rodhus'
  },

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
