<script setup>
// Отключаем защиту для страницы регистрации
definePageMeta({ 
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' } 
})

const { signIn } = useAuth()
const form = reactive({ email: '', password: '' })
const loading = ref(false)

const handleRegister = async () => {
  if (!form.email || !form.password) return alert('Заполните все поля')
  
  loading.value = true
  try {
    // 1. Создаем пользователя в БД
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: form
    })

    // 2. Сразу авторизуем его
    await signIn({ 
      email: form.email, 
      password: form.password 
    }, { callbackUrl: '/', redirect: true })
    
  } catch (e) {
    const msg = e.response?._data?.statusMessage || 'Ошибка при регистрации'
    alert(msg)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 class="text-3xl font-bold text-center text-slate-800 mb-6">Регистрация</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            placeholder="example@mail.com"
            class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Пароль</label>
          <input 
            v-model="form.password" 
            type="password" 
            required 
            placeholder="••••••••"
            class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {{ loading ? 'Создание аккаунта...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-slate-600">
        Уже есть аккаунт? 
        <NuxtLink to="/login" class="text-blue-600 font-bold hover:underline">Войти</NuxtLink>
      </div>
    </div>
  </div>
</template>