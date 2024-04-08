import type { CalendarEvent } from '@/models/Events'

export const regularEvents: CalendarEvent[] = [
  // Histoire Antique
  {
    title: 'Exécution de Tyhos',
    date: { day: 1, month: 0, year: 0 },
    description:
      "Le léviathan Tyhos rend l'âme après un combat de plusieurs années contre Lystos, le dieu du Soleil.",
    category: 'bénédiction',
    secondaryCategories: ['mort'],
    wiki: 'https://alexcreates.fr/leim/index.php/Alliance_Kald%C3%A9lienne#Trait%C3%A9_de_Kadel',
    hidden: true
  },
  {
    title: 'Traité de Kadel',
    date: { day: 20, month: 4, year: 100 },
    description: '',
    category: 'inauguration',
    secondaryCategories: ['législation'],
    wiki: 'https://alexcreates.fr/leim/index.php/Alliance_Kald%C3%A9lienne#Trait%C3%A9_de_Kadel'
  },

  // Histoire Récente
  {
    title: 'Création de la buse kaldélienne',
    date: { day: 4, month: 2, year: 3113 },
    description:
      'Sophia de Rougefer invente la buse kaldélienne, une arme à feu souple à deux canons.',
    category: 'invention',
    secondaryCategories: ['science'],
    wiki: 'https://alexcreates.fr/leim/index.php/Buse_(arme)'
  },

  // "Les Milles Cages"
  {
    title: "Arrivée d'aventuriers à Borélis",
    date: { day: 12, month: 7, year: 3209 },
    description:
      'Tara Belyus, Vascylly et Adol Sulvan livrent 3 condamnés à Handany. Ils partent pour la mer durant la journée.',
    category: 'joueurs'
  },
  {
    title: "Naufrage de l'Éclipse",
    description:
      "L'Éclipse, le navire de la garde contenant des condamnés à destination des Cages Handaniennes, s'échoue au large des côtes montagneuses de la Lance d'Aldys.",
    date: { day: 14, month: 7, year: 3209 },
    category: 'catastrophe'
  },
  {
    title: 'Emprisonnement de Tivian Rodhus',
    description: "Celui qu'on surnomme la Bête d'Ambrose arrive à Handany, où il purgera sa peine.",
    date: { day: 14, month: 7, year: 3209 },
    category: 'législation'
  },
  {
    title: 'Sulvan et Anastael atteignent Bamast',
    date: { day: 19, month: 2, year: 3210 },
    category: 'joueurs'
  },
  {
    title: 'Jugement de Bormis Griloup',
    description:
      "Bromis Griloup est jugé coupable d'escroquerie et sabotage aux Cours d'Acier de Tourgrise. Il purgera une peine de 10 ans au sein des prisons royales.",
    date: { day: 4, month: 8, year: 3209 },
    category: 'législation'
  },

  // "Les Cloches de Cantane"
  {
    title: 'Inauguration de la Cloche du Pilier',
    description: "Le Moine Premier inaugure la grande cloche d'argent au sommet du Pilier d'Ikami.",
    date: { day: 29, month: 5, year: 3209 },
    category: 'religion',
    hidden: true
  },
  {
    title: '1ère disparation à Cantane',
    description: 'Première victime de la série de disparitions qui affecte Cantane',
    date: { day: 28, month: 7, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '2ème disparation à Cantane',
    description: 'Seconde victime de la série de disparitions qui affecte Cantane',
    date: { day: 32, month: 7, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '3ème disparation à Cantane',
    description: 'Troisième victime de la série de disparitions qui affecte Cantane',
    date: { day: 10, month: 8, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '4ème disparation à Cantane',
    description: 'Quatrième victime de la série de disparitions qui affecte Cantane',
    date: { day: 19, month: 8, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '5ème disparation à Cantane',
    description: 'Cinquième victime de la série de disparitions qui affecte Cantane',
    date: { day: 22, month: 8, year: 3209 },
    category: 'mort',
    hidden: true
  }
]
