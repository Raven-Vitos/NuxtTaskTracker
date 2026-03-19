<script setup>
definePageMeta({ auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' } })

const { signIn } = useAuth()
const credentials = reactive({ email: '', password: '' })
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    // Важно: не используем await для signIn, если redirect: true, 
    // либо обрабатываем результат
    const response = await signIn(
      { 
        email: credentials.email, 
        password: credentials.password 
      }, 
      { callbackUrl: '/', redirect: true }
    )
    console.log('Ответ от signIn:', response)
  } catch (e) {
    // Выведем реальную ошибку в консоль браузера, чтобы понять, что не так
    console.error('Детальная ошибка входа:', e)
    error.value = 'Ошибка авторизации. Проверьте консоль браузера.'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 class="text-3xl font-bold text-center text-slate-800 mb-6">Вход в систему</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">

        <div v-if="error" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{{ error }}</div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input 
            v-model="credentials.email" 
            type="email" 
            placeholder="example@mail.com"
            class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Пароль</label>
          <input 
            v-model="credentials.password" 
            type="password" 
            placeholder="••••••••"
            class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        
        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Войти</button>
      </form>

      <div class="mt-6 text-center text-sm text-slate-600">
        Нет аккаунта? 
        <NuxtLink to="/register" class="text-blue-600 font-bold hover:underline">Создать</NuxtLink>
      </div>

    </div>
  </div>
</template>