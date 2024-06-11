const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
    { name: 'Tecnologia' },
    { name: 'Viaggi' },
    { name: 'Cucina' },
    { name: 'Salute e benessere' },
    { name: 'Fitness e allenamento' },
    { name: 'Arte e cultura' },
    { name: 'Musica' },
    { name: 'Film e cinema' },
    { name: 'Libri e lettura' },
    { name: 'Moda e stile' },
    { name: 'Fotografia' },
    { name: 'Ambiente e sostenibilità' },
    { name: 'Finanza personale' },
    { name: 'Crescita personale' },
    { name: 'Hobby e tempo libero' },
    { name: 'Giardinaggio' },
    { name: 'Animali domestici' },
    { name: 'Tecnologia dell\'informazione (IT)' }
];


async function main() {
    for (const category of categories) {
        await prisma.category.create({
            data: category
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
