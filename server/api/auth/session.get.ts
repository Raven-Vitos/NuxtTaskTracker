import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  // В local mode сессия проверяется по токену в заголовке Authorization
  const authHeader = getHeader(event, 'Authorization')
  
  if (!authHeader) {
    return null
  }

  // Извлекаем id пользователя из нашего "dummy-token-ID"
  const token = authHeader.replace('Bearer ', '')
  const userId = token.replace('dummy-token-', '')

  // Ищем пользователя в БД, чтобы вернуть актуальные данные
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true } // Не отдаем пароль!
  })

  if (!user) return null

  return {
    user: {
      id: user.id,
      email: user.email
    }
  }
})