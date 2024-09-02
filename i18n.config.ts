export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
  messages: {
    en: {
      head: {
        title: "Fantasy calendars for TTRPGs",
        description: "Tools for players and game masters to help them visualize fantasy worlds better."
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
          deleteDialog: {
            title: "Are you sure you want to delete this calendar ?",
            subtitle: "Its events won't be accessible anymore and you won't be able to retrieve the deleted data !",
          },
        }
      }
    },
    fr: {
      head: {
        title: "Calendriers fantasies pour JDR",
        description: "Outils destinés aux joueurs et maîtres de jeux pour visualiser plus facilement leurs univers."
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
          deleteDialog: {
            title: "Êtes-vous sûr de supprimer ce calendrier ?",
            subtitle: "Les évènements ne seront plus accessibles et vous ne pourrez plus récupérer les données !",
          },
        }
      }
    }
  }
}))
