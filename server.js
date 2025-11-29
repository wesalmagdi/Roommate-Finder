import 'dotenv/config';             
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/postRoutes.js';
import { logger } from './middlewares/logger.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(logger);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Roommate Finder Backend is running!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'API Root works!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
