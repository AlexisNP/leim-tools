// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  eslint: {}
})
