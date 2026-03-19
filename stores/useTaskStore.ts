import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as any[],
  }),
  actions: {
    async fetchTasks() {
      const { token } = useAuth()
      this.tasks = await $fetch('/api/tasks', {
        headers: { Authorization: token.value || '' }
      })
    },

    async addTask(title: string) {
      const { token } = useAuth()
      const task = await $fetch('/api/tasks', {
        method: 'POST',
        body: { title },
        headers: { Authorization: token.value || '' }
      })
      this.tasks.push(task)
    },

    // ВОТ ЭТОТ МЕТОД НУЖНО ДОБАВИТЬ:
    async updateTask(task: any) {
      try {
        const { token } = useAuth()
        await $fetch(`/api/tasks/${task.id}`, {
          method: 'PATCH', // Используем PATCH для частичного обновления
          body: { status: task.status },
          headers: { Authorization: token.value || '' }
        })
      } catch (e) {
        console.error('Ошибка при обновлении задачи:', e)
      }
    },

    async deleteTask(id: string) {
      const { token } = useAuth()
      await $fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token.value || '' }
      })
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})