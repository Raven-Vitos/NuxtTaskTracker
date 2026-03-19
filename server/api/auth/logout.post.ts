export default defineEventHandler(async (event) => {
  // Здесь можно добавить логику инвалидации токена в БД, если нужно
  return { status: 'success' }
})