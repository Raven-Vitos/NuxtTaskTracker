<script setup>
import draggable from 'vuedraggable'

// https://lucide.dev/icons/paw-print
import { Plus, Trash2, GripVertical, LogOut, CheckCircle2, PawPrint, ShieldBan, ShieldEllipsis, ShieldCheck } from 'lucide-vue-next'
import { useTaskStore } from '../../stores/useTaskStore'

const { data, signOut } = useAuth()
const store = useTaskStore()
const newTaskTitle = ref('')

// Загружаем задачи только если юзер авторизован
onMounted(() => {
  if (data.value) store.fetchTasks()
})

const handleLogout = async () => {
  await signOut({ 
    callbackUrl: '/login', // Куда отправить пользователя после выхода
    redirect: true         // Разрешить перенаправление
  })
}

const getTasksByStatus = (status) => {
  return computed({
    get: () => store.tasks.filter(t => t.status === status),
    set: (value) => {
      value.forEach(task => {
        if (task.status !== status) {
          task.status = status
          store.updateTask(task)
        }
      })
      const otherTasks = store.tasks.filter(t => t.status !== status)
      store.tasks = [...otherTasks, ...value]
    }
  })
}

const columns = [
  { title: 'К выполнению', status: 'todo', icon: ShieldBan, color: 'bg-red-100 text-red-600' },
  { title: 'В работе', status: 'in-progress', icon: ShieldEllipsis, color: 'bg-yellow-100 text-yellow-600' },
  { title: 'Готово', status: 'done', icon: ShieldCheck, color: 'bg-green-100 text-green-600' }
]

const addNewTask = () => {
  if (!newTaskTitle.value.trim()) return
  store.addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <nav class="bg-white border-b border-slate-200 px-6 py-4 mb-8">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-2 font-bold text-xl text-blue-600">
          <PawPrint />
          <span>V&V</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-slate-600 border-r pr-4">{{ data?.user?.email }}</span>
          <button @click="handleLogout" class="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors">
            <LogOut :size="18" /> Выйти
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-6xl mx-auto px-6">
      <header class="mb-10">
        <h1 class="text-3xl font-bold mb-6 text-slate-800">Мои задачи</h1>
        <div class="flex gap-2 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <input 
            v-model="newTaskTitle" 
            @keyup.enter="addNewTask"
            placeholder="Что нужно сделать?" 
            class="flex-1 px-4 py-2 outline-none"
          />
          <button @click="addNewTask" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
            <Plus :size="20" /> Добавить
          </button>
        </div>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        <div v-for="col in columns" :key="col.status" class="bg-slate-200/40 p-4 rounded-2xl border border-slate-200/60 shadow-inner">
          <h2 class="font-bold mb-4 flex justify-between items-center text-slate-500 uppercase text-[10px] tracking-widest px-2">
            <component :is="col.icon" :size="16" :class="col.color"/>
            {{ col.title }}
            <span class="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{{ getTasksByStatus(col.status).value.length }}</span>
          </h2>

          <draggable
            v-model="getTasksByStatus(col.status).value"
            group="tasks"
            item-key="id"
            class="space-y-3 min-h-[400px]"
            ghost-class="opacity-20"
          >
            <template #item="{ element }">
              <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center group hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing">
                <GripVertical class="text-slate-300 mr-2 group-hover:text-blue-400" :size="18" />
                <span class="flex-1 text-slate-700">{{ element.title }}</span>
                <button @click="store.deleteTask(element.id)" class="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1">
                  <Trash2 :size="18" />
                </button>
              </div>
            </template>
          </draggable>
        </div>
      </main>
    </div>
  </div>
</template>