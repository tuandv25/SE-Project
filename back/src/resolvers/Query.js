const Query = {
  async getProduct(parent, agrs, {prisma}, info) {
      return await prisma.product.findMany();
  }, 
  async getBannerImg(parent, agrs,{prisma}, info) {
      return await prisma.bannerImg.findMany({
          where:{
              publish: true,
          }
      });
  },
  async getBannerImg(parent, agrs, {prisma}, info) {
      return await prisma.bannerImg.findMany();
  }, 
  async getUser(parent, agrs, {prisma}, info){
      return await prisma.user.findMany();
  },
  async getVoucher(parent, agrs, {prisma}, info) {
      return await prisma.voucher.findMany();
  },
  async getOrder(parent, agrs, {prisma}, info) {
      return await prisma.order.findMany();
  }, 
  async getVoucherPremium(parent, agrs, {prisma}, info) {
      return await prisma.voucherPremium.findMany();
  }, 
  async getVoucherBirthday(parent, agrs, {prisma}, info) {
    return await prisma.voucherBirthday.findMany();
}, 
  async getSales(parent, agrs, {prisma}, info) {
      return await prisma.sales.findMany();
  },
  async getSale(parent, agrs, {prisma}, info){
      return await prisma.sales.findFirst({
          where: {
              publish: true,
          }
      })
  },
  async getAccessory(parent, agrs, {prisma}, info) {
      return await prisma.accessory.findMany();
  }
}
export default Query;