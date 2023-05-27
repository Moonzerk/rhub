export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    },
  },
  modules: [
    '@nuxt/devtools',
    'nuxt-icon',
    '@vueuse/nuxt',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ignorePrefix: '_',
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'employee',
        path: '/employees/:id',
        file: '~/pages/employees/index.vue',
      });
    }
  }
})
