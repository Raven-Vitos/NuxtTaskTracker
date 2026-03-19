export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth'
  ],

  auth: {
    provider: {
      type: 'local',
      endpoints: {
        // Указываем полные пути к твоим API файлам
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        getSession: { path: '/session', method: 'get' }
      },
      pages: {
        login: '/login' // Это страница на фронтенде (pages/login.vue)
      },
      token: {
        signInResponseTokenPointer: '/token'
      }
    },
    globalAppMiddleware: true
  },

  runtimeConfig: {
    authSecret: '' 
  },

  devtools: { enabled: true }
})