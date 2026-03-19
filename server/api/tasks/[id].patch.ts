import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader) throw createError({ statusCode: 401 })

  // Извлекаем ID задачи из URL
  const taskId = getRouterParam(event, 'id')
  const body = await readBody(event)

  // Обновляем только статус
  return await prisma.task.update({
    where: { id: taskId },
    data: {
      status: body.status
    }
  })
})