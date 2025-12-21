import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/postRoutes.js';
import { logger } from './middlewares/logger.js';

const app = express();
const port = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors({
  origin: [
    'https://your-frontend-project.up.railway.app', // Your live URL
    'http://localhost:5173'                       // Local development
  ],
  credentials: true
}));app.use(logger);

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
