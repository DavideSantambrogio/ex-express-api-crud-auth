const express = require('express');
const cors = require('cors');
const app = express();

const { handle404Error, handle500Error } = require('./middlewares/errorMiddleware');
const bcrypt = require('bcryptjs');

app.use(express.json());

// Abilita CORS per tutte le richieste
app.use(cors());

// Rotte per gestire richieste alla homepage e alla favicon
app.get('/', (req, res) => {
    res.send('<h1>Benvenuto nel mio blog!</h1>');
});

// Utilizzo delle rotte per i post
const postRoutes = require('./routes/postRoutes');
app.use('/api', postRoutes);

// Utilizzo delle rotte per gli user
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.get('/favicon.ico', (req, res) => {
    res.status(404).send('Favicon non trovato');
});

// Middleware per gestire gli errori
app.use(handle404Error); // Gestione errori 404
app.use(handle500Error); // Gestione errori 500

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Il server è in esecuzione sulla porta ${PORT}`);
});
