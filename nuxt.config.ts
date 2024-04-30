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
  appConfig: {
    environment: process.env.APP_ENV,
    notionToken: process.env.API_TOKEN_NOTION,
    databaseIdListener: process.env.DATABASE_ID_LISTENER,
    databaseIdOtayori: process.env.DATABASE_ID_OTAYORI,
    databaseIdMailTheme: process.env.DATABASE_ID_MAIL_THEME,
    liffId: process.env.LIFF_ID
  },
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
    "easymde/dist/easymde.min.css"
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