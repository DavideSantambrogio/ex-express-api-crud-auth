const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Funzione per generare un token JWT
function generateToken(user) {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Verifica se l'utente esiste già
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Crea l'hash della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea il nuovo utente nel database
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        // Genera il token JWT e invialo nella risposta
        const token = generateToken(newUser);
        return res.status(201).json({ message: 'User registered successfully', user: newUser, token });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cerca l'utente nel database
        const user = await prisma.user.findUnique({ where: { username: username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Confronta la password fornita con quella nel database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Genera il token JWT e invialo nella risposta
        const token = generateToken(user);
        return res.status(200).json({ message: 'Login successful', user: user, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
