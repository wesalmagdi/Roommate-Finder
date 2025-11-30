import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/postRoutes.js';
import { logger } from './middlewares/logger.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Roommate Finder Backend is running!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'API Root works!' });
});

// Only start server if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

async function startServer() {
  try {
    await connectDB();
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

export default app;
