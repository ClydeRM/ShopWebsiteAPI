import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 清空Table
  const models = Object.getOwnPropertyNames(prisma);
  const targets = models.filter((model) => !model.startsWith('_'));
  await Promise.all(targets.map((target) => prisma[target].deleteMany()));

  const John = await prisma.user.create({
    data: {
      email: 'john@prisma.io',
      hash: '$2a$10$86J9Qor1jWeVVkQpqCNWWeT2ml9wQt4P5iuwxsonm2xYUCEhsjdOO',
      firstname: 'John',
      lastname: 'Doe',
      phone: '0987654321',
    },
  });

  // constructor userId
  const { id: johnId } = await prisma.user.findUnique({
    where: {
      email: 'john@prisma.io',
    },
    select: {
      id: true,
    },
  });

  const JohnWallet = await prisma.payment.create({
    data: {
      userId: johnId,
      paymentType: 'CREDIT',
      account: '11223344556677',
      bankCode: '004',
    },
  });

  const JohnAddress = await prisma.address.create({
    data: {
      userId: johnId,
      country: 'Taiwan',
      state: 'ROC',
      city: 'Tainan',
      district: '永康區',
      postalCode: '999',
      address: '發財街66巷77弄999號101樓之77號',
    },
  });

  const Category = await prisma.category.createMany({
    data: [
      {
        name: 'TV',
        desc: '8K mini-LED on fire',
        enable: true,
      },
      {
        name: 'Monitor',
        desc: '4K mini-LED rest in peace',
        enable: true,
      },
      {
        name: 'SeaFood',
        desc: 'BLUE SCHOOL JUMBO BRAND',
        enable: false,
      },
    ],
  });

  // TV catId
  const { id: TVcatId } = await prisma.category.findUnique({
    where: {
      name: 'TV',
    },
    select: {
      id: true,
    },
  });

  // TV invId
  const { id: TVinvId } = await prisma.inventory.create({
    data: {
      quantity: 100,
      sold: 0,
    },
    select: {
      id: true,
    },
  });

  const TV = await prisma.merchandise.createMany({
    data: [
      {
        catId: TVcatId,
        invId: TVinvId,
        name: 'Samsung Neo QLED 85',
        desc: 'Big brand from Korea',
        cost: 500000,
        price: 550000,
      },
    ],
  });

  console.log({ John }, { JohnWallet }, { JohnAddress }, { Category }, { TV });
}

main() // Doing the seeding script
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
