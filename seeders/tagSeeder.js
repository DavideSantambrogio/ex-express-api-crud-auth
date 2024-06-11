const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tags = [
    { name: 'JavaScript' },
    { name: 'Node.js' },
    { name: 'React' },
    { name: 'Viaggi' },
    { name: 'Cucina Italiana' },
    { name: 'Cucina Asiatica' },
    { name: 'Fitness' },
    { name: 'Yoga' },
    { name: 'Arte contemporanea' },
    { name: 'Musica classica' },
    { name: 'Film indipendenti' },
    { name: 'Fantascienza' },
    { name: 'Romanzi' },
    { name: 'Fashion' },
    { name: 'Fotografia di paesaggio' },
    { name: 'Risparmio' },
    { name: 'Sviluppo personale' },
    { name: 'Giardinaggio urbano' },
    { name: 'Cani' },
    { name: 'Gatti' },
    { name: 'Machine Learning' }
];


async function main() {
    for (const tag of tags) {
        await prisma.tag.create({
            data: tag
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
