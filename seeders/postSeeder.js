const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const slugify = require('slugify');

const prisma = new PrismaClient();

const generateUniqueSlug = async (title) => {
    let slug = slugify(title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let count = 1;

    // Verifica l'esistenza dello slug
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }

    return uniqueSlug;
};

const getRandomImage = () => {
    // Genera un URL casuale utilizzando Picsum Photos
    const randomImageId = faker.datatype.number({ min: 1, max: 1000 });
    return `https://picsum.photos/200/300?random=${randomImageId}`;
};

const seedPosts = async () => {
    try {
        const categories = await prisma.category.findMany();
        const tags = await prisma.tag.findMany();
        const users = await prisma.user.findMany();

        // Numero di post da creare
        const numPosts = 50;

        // Creazione dei post
        const posts = [];
        for (let i = 0; i < numPosts; i++) {
            const title = faker.lorem.words(5); // Titolo casuale
            const content = faker.lorem.sentence(); // Genera una singola frase casualmente
            const published = faker.datatype.boolean(); // Pubblicato casualmente
            const categoryId = faker.random.arrayElement(categories).id; // Categoria casuale
            const userId = faker.random.arrayElement(users).id; // Utente casuale
            const tagIds = faker.random.arrayElements(tags, faker.datatype.number({ min: 1, max: 3 })).map(tag => tag.id); // Tags casuali

            const slug = await generateUniqueSlug(title);
            const image = getRandomImage(); // URL casuale dell'immagine da Picsum Photos
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    published,
                    categoryId,
                    userId,
                    image,
                    tags: {
                        connect: tagIds.map(id => ({ id }))
                    },
                    slug
                }
            });

            posts.push(post);
        }

        console.log('Seed dei post completato:', posts);
    } catch (error) {
        console.error('Errore durante il seeding dei post:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedPosts();
