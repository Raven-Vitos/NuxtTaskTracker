import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  await prisma.task.delete({ where: { id } })
  return { success: true }
})