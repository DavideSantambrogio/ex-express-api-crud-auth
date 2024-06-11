const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funzione per creare una nuova categoria nel database
const createCategory = async (name) => {
    try {
        // Utilizzo del metodo create del Prisma Client per creare una nuova categoria
        const category = await prisma.category.create({
            data: {
                name: name,
            },
        });
        // Log di conferma della creazione della categoria
        console.log('Categoria creata:', category);
        // Restituzione della categoria creata
        return category;
    } catch (error) {
        // Gestione degli errori in caso di fallimento della creazione
        console.error('Errore durante la creazione della categoria:', error);
        throw error;
    }
};

// Funzione per recuperare tutte le categorie dal database
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error('Errore durante il recupero delle categorie:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Esporta le funzioni createCategory e getAllCategories
module.exports = {
    createCategory,
    getAllCategories
};
