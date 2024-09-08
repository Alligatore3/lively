// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  // @see https://tailwindcss.nuxtjs.org/getting-started/installation
  modules: [
    '@nuxtjs/tailwindcss', ['@nuxtjs/google-fonts', {
      families: {
        Raleway: true,
      }
    }]
  ]
})