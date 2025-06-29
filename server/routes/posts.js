import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read job data from file
const jobs = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../job.json'))
);


let postData = [...jobs];

// ✅ GET all posts (optional limit)
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(postData.slice(0, limit));
  }

  res.status(200).json(postData);
});

// ✅ GET single post by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const post = postData.find((p) => String(p.id) === String(id));

  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
});

// ✅ CREATE a new post
router.post('/', (req, res, next) => {
  try {
    const {
      title,
      type,
      location,
      description,
      salary,
      company,
    } = req.body;

    if (
      !title ||
      !type ||
      !location ||
      !description ||
      !salary ||
      !company?.name ||
      !company?.contactEmail
    ) {
      const error = new Error('Missing required job fields');
      error.status = 400;
      throw error;
    }

    const newPost = {
      id: postData.length + 1,
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: company.name,
        description: company.description || '',
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone || '',
      },
    };

    postData.push(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

// ✅ UPDATE a post
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const index = postData.findIndex((p) => String(p.id) === String(id));

  if (index === -1) {
    const error = new Error(`Post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  const {
    title,
    type,
    location,
    description,
    salary,
    company,
  } = req.body;

  if (
    !title ||
    !type ||
    !location ||
    !description ||
    !salary ||
    !company?.name ||
    !company?.contactEmail
  ) {
    return res.status(400).json({ msg: 'Missing required job fields' });
  }

  const updatedPost = {
    ...postData[index],
    title,
    type,
    location,
    description,
    salary,
    company: {
      name: company.name,
      description: company.description || '',
      contactEmail: company.contactEmail,
      contactPhone: company.contactPhone || '',
    },
  };

  postData[index] = updatedPost;

  res.status(200).json(updatedPost);
});

// ✅ DELETE a post
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const index = postData.findIndex((p) => String(p.id) === String(id));

  if (index === -1) {
    const error = new Error(`Post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  postData.splice(index, 1);
  res.status(200).json({ msg: `Post with id ${id} deleted successfully` });
});

export default router;


