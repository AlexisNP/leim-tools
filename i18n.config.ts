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
        greeting: "Connected as {user}",
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
            editDialog: {
              title: "Edit event",
              subtitle: "Update event data",
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
            title: "New calendar",
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
        greeting: "Connecté en tant que {user}",
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
            editDialog: {
              title: "Modifier l'évènement",
              subtitle: "Mettre à jour les données de l'évènement",
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
            title: "Nouveau calendrier",
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
