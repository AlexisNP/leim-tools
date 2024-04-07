import type { CalendarEvent } from '@/models/Events'

export const regularEvents: CalendarEvent[] = [
  {
    title: "Arrivée d'aventuriers à Borélis",
    date: { day: 12, month: 7, year: 3209, period: 'nante' },
    description:
      'Tara Belyus, Vascylly et Adol Sulvan livrent 3 condamnés à Handany. Ils partent pour la mer durant la journée.',
    category: 'player'
  },
  {
    title: "Naufrage de l'Éclipse",
    description:
      "L'Éclipse, le navire de la garde contenant des condamnés à destination des Cages Handaniennes, s'échoue au large des côtes montagneuses de la Lance d'Aldys.",
    date: { day: 14, month: 7, year: 3209, period: 'nante' },
    category: 'catastrophe'
  },
  {
    title: 'Emprisonnement de Tivian Rodhus',
    description: "Celui qu'on surnomme la Bête d'Ambrose arrive à Handany, où il purgera sa peine.",
    date: { day: 14, month: 7, year: 3209, period: 'nante' },
    category: 'legal'
  },
  {
    title: 'Sulvan et Anastael atteignent Bamast',
    date: { day: 19, month: 2, year: 3210, period: 'nante' },
    category: 'player'
  },
  {
    title: 'Jugement de Bormis Griloup',
    description:
      "Bromis Griloup est jugé coupable d'escroquerie et sabotage aux Cours d'Acier de Tourgrise. Il purgera une peine de 10 ans au sein des prisons royales.",
    date: { day: 4, month: 8, year: 3209, period: 'nante' },
    category: 'legal'
  },

  // "Les Cloches de Cantane"
  {
    title: 'Inauguration de la Cloche du Pilier',
    description: "Le Moine Premier inaugure la grande cloche d'argent au sommet du Pilier d'Ikami.",
    date: { day: 29, month: 5, year: 3209, period: 'nante' },
    category: 'religious'
  },
  {
    title: '1ère disparation à Cantane',
    description: 'Première victime de la série de disparitions qui affecte Cantane',
    date: { day: 28, month: 7, year: 3209, period: 'nante' },
    category: 'death'
  },
  {
    title: '2ème disparation à Cantane',
    description: 'Seconde victime de la série de disparitions qui affecte Cantane',
    date: { day: 32, month: 7, year: 3209, period: 'nante' },
    category: 'death'
  },
  {
    title: '3ème disparation à Cantane',
    description: 'Troisième victime de la série de disparitions qui affecte Cantane',
    date: { day: 10, month: 8, year: 3209, period: 'nante' },
    category: 'death'
  },
  {
    title: '4ème disparation à Cantane',
    description: 'Quatrième victime de la série de disparitions qui affecte Cantane',
    date: { day: 19, month: 8, year: 3209, period: 'nante' },
    category: 'death'
  },
  {
    title: '5ème disparation à Cantane',
    description: 'Cinquième victime de la série de disparitions qui affecte Cantane',
    date: { day: 22, month: 8, year: 3209, period: 'nante' },
    category: 'death'
  }
]
