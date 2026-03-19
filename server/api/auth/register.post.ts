import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 1. Простая валидация
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

  try {
    // 2. Проверка на дубликат
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User already exists',
      })
    }

    // 3. Создание (в идеале пароль должен быть хеширован)
    const user = await prisma.user.create({
      data: { email, password }
    })

    // ВАЖНО: Возвращаем объект, который фронтенд сможет прочитать
    return {
      id: user.id,
      email: user.email
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Server error during registration'
    })
  }
})