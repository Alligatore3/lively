// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  css: ['~/assets/css/main.css'],
  // @see https://tailwindcss.nuxtjs.org/getting-started/installation
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Raleway: true,
        },
      },
    ],
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
});
