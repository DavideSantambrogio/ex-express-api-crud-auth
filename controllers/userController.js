const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funzione per ottenere tutti gli utenti dal database
exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Errore durante il recupero degli utenti:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};
