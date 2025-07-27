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
    "@nuxt/content",
    "@nuxthub/core",
  ],

  css: ["@/assets/main.css"],

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
        "/explore(/*)?",
        "/about(/*)?"
      ]
    }
  },

  shadcn: {
    prefix: "Ui",
    componentDir: "./app/components/ui"
  },

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },

  eslint: {},
  compatibilityDate: "latest",
})
