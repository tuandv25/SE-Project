async function orders(parent, args, context) {
  return context.prisma.Order.findMany({
    where: { userId: parent.id }
  })
}

module.exports = {
  orders
}