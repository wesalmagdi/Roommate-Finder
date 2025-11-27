require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth'); // auth routes
const { logger } = require('./middlewares/logger'); // logger middleware

app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes); // mount auth routes

app.get('/', (req, res) => {
    res.send('Roommate Finder Backend is running!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'API Root works!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
