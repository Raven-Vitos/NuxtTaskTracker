import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const user = await prisma.user.findFirst({
    where: { 
      email: body.email.toLowerCase().trim(),
      password: body.password 
    }
  })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный логин или пароль' })
  }

  // ОБЯЗАТЕЛЬНО: возвращаем структуру, которую ожидает sidebase-auth
  return {
    token: 'dummy-token-' + user.id, // Библиотека ищет именно этот ключ "token"
    user: {
      id: user.id,
      email: user.email
    }
  }
})