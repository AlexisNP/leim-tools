import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxthub/core",
    "@nuxt/content",
  ],

  css: ["~/assets/main.css"],

  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "tttools_lang",
    },
    locales: [
      {
        code: "en",
        name: "English"
      },
      {
        code: "fr",
        name: "Français"
      }
    ]
  },

  supabase: {
    redirectOptions: {
      login: "/",
      callback: "/my/",
      exclude: [
        "/calendars(/*)?",
        "/explore(/*)?"
      ]
    }
  },

  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui"
  },

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },

  eslint: {},
  compatibilityDate: "2025-04-16",
})