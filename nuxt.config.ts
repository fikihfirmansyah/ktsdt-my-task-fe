// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";


export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    apiSecret: 'https://api.nuxtjs.dev/api',
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  },

  app: {
    head: {
      title: 'Nuxt 3 Template',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },

  router: {
    extendRoutes(routes, resolve): void {
      routes.push({
        name: 'edit-course',
        path: '/courses/:id/edit',
        component: resolve(__dirname, '/pages/courses/_id/edit.vue')
      })
    }
  }

})
