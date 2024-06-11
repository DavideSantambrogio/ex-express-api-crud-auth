const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funzione per creare un nuovo tag nel database
const createTag = async (name) => {
    try {
        // Utilizzo del metodo create del Prisma Client per creare un nuovo tag
        const tag = await prisma.tag.create({
            data: {
                name: name,
            },
        });
        // Log di conferma della creazione del tag
        console.log('Tag creato:', tag);
        // Restituzione del tag creato
        return tag;
    } catch (error) {
        // Gestione degli errori in caso di fallimento della creazione
        console.error('Errore durante la creazione del tag:', error);
        throw error;
    }
};

// Funzione per ottenere tutti i tag dal database
const getAllTags = async (req, res) => {
    try {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    } catch (error) {
        console.error('Errore durante il recupero dei tag:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

module.exports = { createTag, getAllTags };
