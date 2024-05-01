import type { CalendarEvent } from '@/models/Events'

export const regularEvents: CalendarEvent[] = [
  // Histoire Antique
  {
    title: "Laurdieu devient la première cité de l'empire de Kaliatos",
    startDate: { day: 3, month: 4, year: -1932 },
    description:
      "L'empire de Kaliatos établi sa capitale dans la cité de Laurdieu, qui connaitra une prospérité nouvelle au sein d'Aldys.",
    category: 'législation',
    secondaryCategories: ['inauguration'],
    wiki: 'https://alexcreates.fr/leim/index.php/Laurdieu',
    hidden: true
  },
  {
    title: "Apparition d'Asménys",
    startDate: { day: 19, month: 7, year: -1358 },
    description:
      "La défunte chanteuse Asménys apparaît à un barde pendant son jeune public, démarrant la religion des Prêtresses d'Asménys.",
    category: 'religion',
    secondaryCategories: ['bénédiction'],
    wiki: 'https://alexcreates.fr/leim/index.php/Pr%C3%AAtresses_d%27Asm%C3%A9nys',
    hidden: true
  },
  {
    title: 'Exécution de Tyhos',
    startDate: { day: 1, month: 0, year: 0 },
    description:
      "Le léviathan Tyhos rend l'âme après un combat de plusieurs années contre Lystos, le dieu du Soleil.",
    category: 'bénédiction',
    secondaryCategories: ['mort'],
    wiki: 'https://alexcreates.fr/leim/index.php/Tyhos',
    hidden: true
  },
  {
    title: 'Traité de Kadel',
    startDate: { day: 29, month: 4, year: 100 },
    description: '',
    category: 'inauguration',
    secondaryCategories: ['législation'],
    wiki: 'https://alexcreates.fr/leim/index.php/Alliance_Kald%C3%A9lienne#Trait%C3%A9_de_Kadel'
  },
  {
    title: 'Découverte des Plaines de Poussières',
    startDate: { day: 17, month: 7, year: 305 },
    description:
      "Les troupes de la reconquête aldienne explorent le littoral d'une immense étendue grise et inerte.",
    category: 'découverte',
    secondaryCategories: ['exploration'],
    wiki: 'https://alexcreates.fr/leim/index.php/Plaines_de_poussi%C3%A8re',
    hidden: true
  },
  {
    title: 'Début de la construction du Rempart de Laurdieu',
    startDate: { day: 30, month: 2, year: 340 },
    description:
      "Le Grand Conseil Kaldélien ordonne la construction d'une muraille autour des Plaines de Poussières, afin de contenir les quelques démons y sortant.",
    category: 'construction',
    wiki: 'https://alexcreates.fr/leim/index.php/Plaines_de_poussi%C3%A8re',
    hidden: true
  },
  {
    title: 'Finition du Rempart de Laurdieu',
    startDate: { day: 27, month: 9, year: 355 },
    description:
      "Les terramanciens kaldéliens terminent les remparts protégeant l'alliance des démons des Plaines de Poussières.",
    category: 'construction',
    secondaryCategories: ['inauguration'],
    wiki: 'https://alexcreates.fr/leim/index.php/Plaines_de_poussi%C3%A8re',
    hidden: true
  },

  // Histoire Récente
  {
    title: "Inauguration de l'Académie Artistique Arcanique",
    startDate: { day: 11, month: 6, year: 2545 },
    description:
      "Scäd Sceni ouvre son institut artistique dédié à l'apprentissage des arts arcaniques",
    category: 'inauguration',
    secondaryCategories: ['arcanologie'],
    wiki: 'https://alexcreates.fr/leim/index.php/Buse_(arme)'
  },
  {
    title: 'Création de la buse kaldélienne',
    startDate: { day: 4, month: 2, year: 3113 },
    description:
      'Sophia de Rougefer invente la buse kaldélienne, une arme à feu souple à deux canons.',
    category: 'invention',
    secondaryCategories: ['science'],
    wiki: 'https://alexcreates.fr/leim/index.php/Buse_(arme)'
  },
  {
    title: 'Scandale Rodhus',
    startDate: { day: 25, month: 9, year: 3208 },
    description:
      "Tivian Rodhus, un professeur estimé de l'Académie Centrale Kaldélienne, est emprisonné pour corruption et aggression sexuelle. Le corps enseignant y est remanié sur ordre de Lazarus Tymos, comte de Nacride.",
    category: 'criminalité',
    secondaryCategories: ['scandale'],
    wiki: 'https://alexcreates.fr/leim/index.php/Tivian_Rodhus'
  },

  // "Les Milles Cages"
  {
    title: "Arrivée d'aventuriers à Borélis",
    startDate: { day: 12, month: 7, year: 3209 },
    description:
      'Tara Belyus, Vascylly et Adol Sulvan livrent 3 condamnés à Handany. Ils partent pour la mer durant la journée.',
    category: 'joueurs'
  },
  {
    title: "Naufrage de l'Éclipse",
    description:
      "L'Éclipse, le navire de la garde contenant des condamnés à destination des Cages Handaniennes, s'échoue au large des côtes montagneuses de la Lance d'Aldys.",
    startDate: { day: 14, month: 7, year: 3209 },
    category: 'catastrophe'
  },
  {
    title: 'Emprisonnement de Tivian Rodhus',
    description: "Celui qu'on surnomme la Bête d'Ambrose arrive à Handany, où il purgera sa peine.",
    startDate: { day: 14, month: 7, year: 3209 },
    category: 'législation'
  },
  {
    title: 'Sulvan et Anastael atteignent Bamast',
    startDate: { day: 19, month: 2, year: 3210 },
    category: 'joueurs'
  },
  {
    title: 'Jugement de Bormis Griloup',
    description:
      "Bromis Griloup est jugé coupable d'escroquerie et sabotage aux Cours d'Acier de Tourgrise. Il purgera une peine de 10 ans au sein des prisons royales.",
    startDate: { day: 4, month: 8, year: 3209 },
    category: 'législation'
  },

  // "Les Cloches de Cantane"
  {
    title: 'Inauguration de la Cloche du Pilier',
    description: "Le Moine Premier inaugure la grande cloche d'argent au sommet du Pilier d'Ikami.",
    startDate: { day: 29, month: 5, year: 3209 },
    category: 'religion',
    hidden: true
  },
  {
    title: '1ère disparation à Cantane',
    description: "Taleb Vaht décède dans une grotte à la suite d'une attaque d'ischiels enragées.",
    startDate: { day: 28, month: 7, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '2ème disparation à Cantane',
    description: 'Donovane le mineur kéturien disparait sans laisser de traces.',
    startDate: { day: 32, month: 7, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '3ème disparation à Cantane',
    description: 'Disparition de Sébastien, gredin sauride.',
    startDate: { day: 10, month: 8, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '4ème disparation à Cantane',
    description: 'Disparition de Thérence, patrouilleur sauride de la Vieille Garde.',
    startDate: { day: 19, month: 8, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: '5ème disparation à Cantane',
    description: 'Disparition de Mathilda Boulais, vendeuse de pierres.',
    startDate: { day: 22, month: 8, year: 3209 },
    category: 'mort',
    hidden: true
  },
  {
    title: 'Grande Banque Minérale de Cantane',
    description:
      'Les artisans et mineurs de Rougefer se réunissent à Cantane pour vendre le fruit de leur dur labeur.',
    startDate: { day: 23, month: 8, year: 3209 },
    category: 'inauguration'
  }
]
