export default defineI18nConfig(() => ({
  legacy: false,
  availableLocales: ["fr", "en"],
  fallbackLocale: "fr",
  messages: {
    en: {
      head: {
        title: "Fantasy calendars for TTRPGs",
        description: "Tools for players and game masters to help them visualize fantasy worlds better.",
      },
      ui: {
        action: {
          back: "Back",
          cancel: "Cancel",
          save: "Save",
          delete: "Delete",
          edit: "Edit",
        },
        colors: {
          selectOne: "Select a color",
          red: "Red",
          orange: "Orange",
          amber: "Amber",
          yellow: "Yellow",
          lime: "Lime",
          green: "Green",
          emerald: "Emerald",
          teal: "Teal",
          cyan: "Cyan",
          sky: "Sky",
          blue: "Blue",
          indigo: "Indigo",
          violet: "Violet",
          purple: "Purple",
          fuchsia: "Fuchsia",
          pink: "Pink",
          rose: "Rose",
          black: "Black",
          white: "White",
        },
        greeting: "Connected as {user}",
        anonymousGreeting: "Preferences",
        sidebarMenu: {
          appearance: "Appearance",
          language: "Language",
          account: "Account",
          login: "Log in",
          logout: "Log out",
          avatarFallback: "Profile",
        },
        dark: "Dark",
        light: "Light",
        system: "System",
        displayMode: "Display mode"
      },
      common: {
        title: "Title"
      },
      entity: {
        category: {
          nameSingular: "Category",
          namePlural: "Categories",
          search: "Search categories",
          notFoundAny: "No categories found.",
          addPrimary: "Add a primary category",
          addSecondaries: "Add secondary categories"
        },
        isLoading: "Loading in progress…",
        addDescription: "Add a description",
        deleteOne: "Delete \"{entity}\"",
        advancedSearch: {
          title: "Advanced search",
          subtitle: "Search through calendar and world data",
          older: "Older",
          newer: "Newer",
          ctaPlaceholder: "Search an event, characters…"
        },
        world: {
          nameSingular: "World",
          namePlural: "Worlds",
          addSingle: "Add a world",
          createDialog: {
            title: "Create a world",
            subtitle: "Worlds are the building blocks which hold all your characters, your calendars…"
          },
          deleteDialog: {
            title: "Delete this world ?",
            subtitle: "This world will be deleted permanently, and all of its associated data will be lost !",
          },
          deletedToast: {
            title: "The world \"{world}\" has been successfuly deleted.",
          },
        },
        calendar: {
          nameSingular: "Calendar",
          namePlural: "Calendars",
          addSingle: "Add a calendar",
          notFoundForWorld: "No calendar for this world… yet !",
          isLoading: "Calendar is loading…",
          date: {
            start: "Start date",
            end: "End date",
            afterTomorrow: "In 2 days",
            tomorrow: "Tomorrow",
            today: "Today",
            yesterday: "Yesterday",
            beforeYesterday: "2 days ago",
            fromTo: "From {startDate} to {endDate}",
            while: "During {duration}",
            xDaysNext: "In {days} days",
            xMonthsNext: "In {months} month(s)",
            xYearsNext: "In {years} year(s)",
            xYearsAndMonthsNext: "In {years} year(s) and {months} month(s)",
            xDaysNextCompact: "{days} days",
            xMonthsNextCompact: "{months} month(s)",
            xYearsNextCompact: "{years} year(s)",
            xYearsAndMonthsNextCompact: "{years} year(s) and {months} month(s)",
            xDaysAgo: "{days} days ago",
            xMonthsAgo: "{months} month(s) ago",
            xYearsAgo: "{years} year(s) ago",
            xYearsAndMonthsAgo: "{years} year(s) and {months} month(s) ago",
            xDaysAgoCompact: "{days} days",
            xMonthsAgoCompact: "{months} month(s)",
            xYearsAgoCompact: "{years} year(s)",
            xYearsAndMonthsAgoCompact: "{years} year(s) and {months} month(s)",
          },
          event: {
            nameSingular: "Event",
            namePlural: "Events",
            title: "Event title",
            isStart: "Start",
            isEnd: "End",
            isHidden: "Hidden event",
            isPublic: "Public event",
            hiddenTooltip: "This event is visible only to game masters.",
            addLocation: "Add a place",
            prevPage: "Previous page with events",
            nextPage: "Next page with events",
            outOfBoundsTitle: "No next or previous events were found",
            outOfBoundsMessage: "Maybe the event is the first or last one ?",
            patterns: {
              title: "Between 3 and 120 caracters.",
              description: "1200 caracters max.",
              location: "Between 3 and 160 caracters.",
            },
            editDialog: {
              title: "Edit event",
              subtitle: "Update event data",
            },
            editErrors: {
              toastTitle: "Event wasn't updated.",
              title_too_big: "Title should be less than 120 characters long.",
              description_too_big: "Description should be less than 1200 characters long.",
              location_too_big: "Location should be less than 160 characters long.",
            },
            deleteDialog: {
              title: "Delete this event",
              subtitle: "Data associated with this event will be lost and you won't be able to retrieve it !",
            },
            deletedToast: {
              title: "The event \"{event}\" has been successfuly deleted.",
            },
          },
          createDialog: {
            title: "Create a calendar",
            tabs: {
              general: {
                title: "General",
              },
              months: {
                title: "Months",
              },
              today: {
                title: "Today",
              },
            }
          },
          deleteDialog: {
            title: "Are you sure you want to delete this calendar ?",
            subtitle: "Its events won't be accessible anymore and you won't be able to retrieve the deleted data !",
          },
          deletedToast: {
            title: "Calendar \"{calendar}\" has been successfuly deleted.",
          },
          millennia: {
            nameSingular: "Millennia",
            nextSingular: "Next millennia",
            prevSingular: "Last millennia",
          },
          centuries: {
            nameSingular: "Century",
            nextSingular: "Next century",
            prevSingular: "Last century",
          },
          decades: {
            nameSingular: "Decade",
            nextSingular: "Next decade",
            prevSingular: "Last decade",
          },
          years: {
            nameSingular: "Year",
            nextSingular: "Next year",
            prevSingular: "Last year",
          },
          months: {
            nameSingular: "Month",
            nextSingular: "Next month",
            prevSingular: "Last month",
            inputName: "Month's name",
            daysNb: "Number of days",
            daysNameSingular: "Day",
            daysNamePlural: "Days",
            daysMaybePlural: "day(s)",
            available: "Months available",
            none: "No months for now",
            noneAvailable: "No months available",
            chooseOne: "Choose a month",
            deleteOne: "Remove {month} from this calendar"
          }
        },
        character: {
          nameSingular: "Character",
          namePlural: "Characters",
        }
      }
    },
    fr: {
      head: {
        title: "Calendriers fantasies pour JDR",
        description: "Outils destinés aux joueurs et maîtres de jeux pour visualiser plus facilement leurs univers.",
      },
      ui: {
        action: {
          back: "Retour",
          cancel: "Annuler",
          save: "Sauvegarder",
          delete: "Supprimer",
          edit: "Modifier",
        },
        colors: {
          selectOne: "Sélectionner une couleur",
          red: "Rouge",
          orange: "Orange",
          amber: "Ambre",
          yellow: "Jaune",
          lime: "Citron",
          green: "Vert",
          emerald: "Émeraude",
          teal: "Turquoise",
          cyan: "Cyan",
          sky: "Bleu clair",
          blue: "Bleu",
          indigo: "Indigo",
          violet: "Violet",
          purple: "Pourpre",
          fuchsia: "Fuchsia",
          pink: "Rose",
          rose: "Magenta",
          black: "Noir",
          white: "Blanc",
        },
        greeting: "Connecté en tant que {user}",
        anonymousGreeting: "Préférences",
        sidebarMenu: {
          appearance: "Apparence",
          language: "Langue",
          account: "Compte",
          login: "Connexion",
          logout: "Déconnexion",
          avatarFallback: "Profil",
        },
        dark: "Sombre",
        light: "Clair",
        system: "Système",
        displayMode: "Mode d'affichage",
      },
      common: {
        title: "Titre"
      },
      entity: {
        category: {
          nameSingular: "Catégorie",
          namePlural: "Catégories",
          search: "Rechercher les catégories",
          notFoundAny: "Aucune catégorie trouvée.",
          addPrimary: "Ajouter une catégorie principale",
          addSecondaries: "Ajouter des catégories secondaires"
        },
        isLoading: "Chargement en cours…",
        addDescription: "Ajouter une description",
        deleteOne: "Supprimer \"{entity}\"",
        advancedSearch: {
          title: "Recherche avancée",
          subtitle: "Rechercher les données disponibles sur le calendrier",
          older: "Plus ancien",
          newer: "Plus récent",
          ctaPlaceholder: "Rechercher un évènement, personnage…"
        },
        world: {
          nameSingular: "Monde",
          namePlural: "Mondes",
          addSingle: "Ajouter un monde",
          createDialog: {
            title: "Créer un monde",
            subtitle: "Un monde est la brique de base qui contient vos personnages, vos calendriers…"
          },
          deleteDialog: {
            title: "Supprimer ce monde ?",
            subtitle: "Le monde sera supprimé définitivement, vous perdrez toutes les données associées !",
          },
          deletedToast: {
            title: "Le monde \"{world}\" a été supprimé avec succès.",
          },
        },
        calendar: {
          nameSingular: "Calendriers",
          namePlural: "Calendrier",
          addSingle: "Ajouter un calendrier",
          notFoundForWorld: "Aucun calendrier pour ce monde… pour l'instant !",
          isLoading: "Chargement du calendrier…",
          date: {
            start: "Date de début",
            end: "Date de fin",
            afterTomorrow: "Après-demain",
            tomorrow: "Demain",
            today: "Aujourd'hui",
            yesterday: "Hier",
            beforeYesterday: "Avant-hier",
            fromTo: "Du {startDate} au {endDate}",
            while: "Pendant {duration}",
            xDaysNext: "Dans {days} jours",
            xMonthsNext: "Dans {months} mois",
            xYearsNext: "Dans {years} an(s)",
            xYearsAndMonthsNext: "Dans {years} an(s) et {months} mois",
            xDaysNextCompact: "{days} jours",
            xMonthsNextCompact: "{months} mois",
            xYearsNextCompact: "{years} an(s)",
            xYearsAndMonthsNextCompact: "{years} an(s) et {months} mois",
            xDaysAgo: "Il y a {days} jours",
            xMonthsAgo: "Il y a {months} mois",
            xYearsAgo: "Il y a {years} an(s)",
            xYearsAndMonthsAgo: "Il y a {years} an(s) et {months} mois",
            xDaysAgoCompact: "{days} jours",
            xMonthsAgoCompact: "{months} mois",
            xYearsAgoCompact: "{years} an(s)",
            xYearsAndMonthsAgoCompact: "{years} an(s) et {months} mois",
          },
          event: {
            nameSingular: "Évènement",
            namePlural: "Évènements",
            title: "Titre de l'évènement",
            isStart: "Début",
            isEnd: "Fin",
            isHidden: "Évènement privé",
            isPublic: "Évènement public",
            hiddenTooltip: "Cet évènement est uniquement visible pour les maîtres du jeu.",
            addLocation: "Ajouter un endroit",
            prevPage: "Précédente page à évènements",
            nextPage: "Prochaine page à évènements",
            outOfBoundsTitle: "Aucun évènement suivant ou précédent trouvé",
            outOfBoundsMessage: "Peut-être l'évènement se situe au début ou à la fin du calendrier ?",
            patterns: {
              title: "Entre 3 et 120 charactères.",
              description: "Maximum 1200 charactères.",
              location: "Entre 3 et 160 charactères.",
            },
            editDialog: {
              title: "Modifier l'évènement",
              subtitle: "Mettre à jour les données de l'évènement",
            },
            editErrors: {
              toastTitle: "L'évènement n'a pas été modifié",
              title_too_big: "Le titre doit être inférieur à 120 caractères.",
              description_too_big: "La description doit être inférieure à 1200 caractères.",
              location_too_big: "La localisation doit être inférieure à 160 caractères.",
            },
            deleteDialog: {
              title: "Supprimer l'évènement",
              subtitle: "Les données associés à cet évènement seront supprimées et vous ne pourrez plus les récupérer !",
            },
            deletedToast: {
              title: "L'évènement \"{event}\" a été supprimé avec succès.",
            },
          },
          createDialog: {
            title: "Créer un calendrier",
            tabs: {
              general: {
                title: "Général",
              },
              months: {
                title: "Mois de l'année",
              },
              today: {
                title: "Aujourd'hui",
              },
            }
          },
          deleteDialog: {
            title: "Êtes-vous sûr de supprimer ce calendrier ?",
            subtitle: "Les évènements ne seront plus accessibles et vous ne pourrez plus récupérer les données !",
          },
          deletedToast: {
            title: "Le calendrier \"{calendar}\" a été supprimé avec succès.",
          },
          millennia: {
            nameSingular: "Millénaire",
            nextSingular: "Millénaire suivant",
            prevSingular: "Millénaire précédent",
          },
          centuries: {
            nameSingular: "Siècle",
            nextSingular: "Siècle suivant",
            prevSingular: "Siècle précédent",
          },
          decades: {
            nameSingular: "Décennie",
            nextSingular: "Décennie suivante",
            prevSingular: "Décennie précédente",
          },
          years: {
            nameSingular: "Année",
            nextSingular: "Année suivante",
            prevSingular: "Année précédente",
          },
          months: {
            nameSingular: "Mois",
            nextSingular: "Mois suivant",
            prevSingular: "Mois précédent",
            inputName: "Nom du mois",
            daysNb: "Nombre de jours",
            daysNameSingular: "Jour",
            daysNamePlural: "Jours",
            daysMaybePlural: "jour(s)",
            Singular: "Année",
            available: "Mois disponibles",
            none: "Aucun mois pour l'instant",
            noneAvailable: "Aucun mois disponible",
            chooseOne: "Choisir un mois",
            deleteOne: "Supprimer {month} du calendrier"
          }
        },
        character: {
          nameSingular: "Personnage",
          namePlural: "Personnages",
        }
      }
    }
  }
}))
