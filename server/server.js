import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import colors from 'colors';

// Load environment variables (used only locally)
dotenv.config();

const app = express();

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
import logger from './logger.js';
import errorHandler from './error.js';

app.use(cors());
app.use(express.json());
app.use(logger); // Custom logger

// Routes
import posts from './routes/posts.js';
app.use('/api/posts', posts);

// Serve frontend in production (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
  );
}

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Fly.io will inject its own port via process.env.PORT
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`.yellow.bold);
});


