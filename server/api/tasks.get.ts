import { prisma } from '../utils/prisma'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  
  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'Не авторизован' })
  }

  const token = authHeader.replace('Bearer ', '')
  const userId = token.replace('dummy-token-', '')

  return await prisma.task.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'asc' }
  })
})