export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
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
          save: "Save"
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
      },
      common: {
        title: "Title"
      },
      entity: {
        deleteOne: "Delete \"{entity}\"",
        world: {
          nameSingular: "World",
          namePlural: "Worlds",
        },
        calendar: {
          nameSingular: "Calendar",
          namePlural: "Calendars",
          addSingle: "Add a calendar",
          notFoundForWorld: "No calendar for this world… yet !",
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
          years: {
            nameSingular: "Year",
          },
          months: {
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
          save: "Sauvegarder"
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
      },
      common: {
        title: "Titre"
      },
      entity: {
        deleteOne: "Supprimer \"{entity}\"",
        world: {
          nameSingular: "Monde",
          namePlural: "Mondes",
        },
        calendar: {
          nameSingular: "Calendriers",
          namePlural: "Calendrier",
          addSingle: "Ajouter un calendrier",
          notFoundForWorld: "Aucun calendrier pour ce monde… pour l'instant !",
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
          years: {
            nameSingular: "Année",
          },
          months: {
            inputName: "Nom du mois",
            daysNb: "Nombre de jours",
            daysNameSingular: "Jour",
            daysNamePlural: "Jours",
            daysMaybePlural: "jour(s)",
            yearsSingular: "Année",
            available: "Mois disponibles",
            none: "Aucun mois pour l'instant",
            noneAvailable: "Aucun mois disponible",
            chooseOne: "Choisir un mois",
            deleteOne: "Supprimer {month} du calendrier"
          }
        }
      }
    }
  }
}))
