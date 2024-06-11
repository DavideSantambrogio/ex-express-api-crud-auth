const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const prisma = new PrismaClient();

async function main() {
    // Crea gli utenti
    const users = Array.from({ length: 15 }, () => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 10)
    }));

    await prisma.user.createMany({
        data: users,
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
