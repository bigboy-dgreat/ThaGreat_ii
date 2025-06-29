// ✅ Loads .env first
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import posts from '../routes/posts.js'; // ✅ ✔✅
import logger from '../middleware/logger.js'
import errorHandler from '../middleware/error.js';
import { fileURLToPath } from 'url';
import notFound from '../middleware/notFound.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


// CORS
app.use(cors());


// Logger Middleware
 app.use(logger);

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional: serve static files
 app.use(express.static(path.join(__dirname, 'public')));

// ✅ Mount API route
app.use('/api/posts', posts)



// Error handle
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
