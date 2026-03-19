import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  // 1. Извлекаем заголовок авторизации
  const authHeader = getHeader(event, 'Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'Вы не авторизованы' 
    })
  }

  // 2. Достаем ID пользователя из токена (формат: "dummy-token-ID")
  const token = authHeader.replace('Bearer ', '')
  const userId = token.replace('dummy-token-', '')

  // 3. Читаем тело запроса
  const body = await readBody(event)
  
  if (!body.title) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Название задачи обязательно' 
    })
  }

  // 4. Создаем задачу в БД
  try {
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        status: 'todo',
        userId: userId // Привязываем к текущему пользователю
      }
    })
    return newTask
  } catch (error) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Ошибка при сохранении задачи в базу данных' 
    })
  }
})