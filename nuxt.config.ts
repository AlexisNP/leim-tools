// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
    vueI18n: "./i18n.config.ts"
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
