require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth'); 
const postRoutes = require('./routes/posts');   // <-- ADD THIS
const { logger } = require('./middlewares/logger');

app.use(express.json());
app.use(logger);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);              // <-- ADD THIS

app.get('/', (req, res) => {
    res.send('Roommate Finder Backend is running!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'API Root works!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
