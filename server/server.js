// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import posts from './routes/posts.js';       // Adjust path as needed
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
app.use(cors());
// Body parsing
app.use(express.json(), express.urlencoded({ extended: false }));
// Logger
app.use(logger);

// Serve static frontend if build exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, '../client/dist'); // assuming Vite build output in `client/dist`
app.use(express.static(clientBuildPath));

// API routes
app.use('/api/posts', posts);

// Fallback to frontend for client-side routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
