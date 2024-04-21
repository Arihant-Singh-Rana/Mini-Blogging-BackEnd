import express from 'express';
import { createAuthor, getAllAuthors } from '../controller/authorApis.mjs';
import { bulkDeleteBlogs, createBlog, deleteBlog, getAllBlogs, updateBlogs } from '../controller/blogAPIs.mjs';

let router = express.Router();

// API for Authors 
router.post('/createAuthor/', createAuthor);
router.get('/getAuthor/', getAllAuthors);

//API for Blogs

router.post('/createBlog/', createBlog);
router.get('/getBlog/', getAllBlogs);
router.put('/updateBlog/:id', updateBlogs);
router.put("/deleteBlog/:id", deleteBlog);
router.put("/bulkDeleteBlog/", bulkDeleteBlogs);

export default router;