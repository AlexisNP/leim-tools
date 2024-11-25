// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/i18n"
  ],
  css: ["~/assets/main.css"],

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
      callback: "/my/"
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
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
  eslint: {}
})
