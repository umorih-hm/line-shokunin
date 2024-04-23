import { resolve } from 'path'

export default defineNuxtConfig({
  srcDir: 'src',
  modulesDir: [
    'node_modules',
    resolve(__dirname, '..', '..', 'node_modules'),
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: process.env.APP_NAME,
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Zen+Kurenaido&display=swap"
        },
      ]
    },
  },
  modules: ['@nuxtjs/i18n',],
  i18n: {
    defaultLocale: 'ja',
    locales: [{ code: 'ja', iso: 'ja-JP', file: 'ja.json' }],
    langDir: 'assets/lang',
  },
  imports: {
    autoImport: true,
  },
  css: [
    '@/assets/styles/customize.scss',
    '@/assets/styles/main.sass',
  ],
  nitro: {
    prerender: {
      ignore: [
        '/200',
        '/404',
      ],
    },
  },
  vite: {
    ssr: {
      noExternal: [
        'vuetify',
      ],
    },
    build: {
      target: ['esnext'],
    },
  },
  build: {
    transpile: [/vuetify/],
  },
})