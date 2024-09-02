export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
  messages: {
    en: {
      ui: {
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
        world: {
          nameSingular: "World",
          namePlural: "Worlds",
        }
      }
    },
    fr: {
      ui: {
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
        world: {
          nameSingular: "Monde",
          namePlural: "Mondes",
        }
      }
    }
  }
}))
