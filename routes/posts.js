import express from 'express';
import { addPost,getPost,getPosts,deletePost,updatePost } from '../controllers/postController.js';


const router =express.Router();


router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',addPost)
router.delete('/:id',deletePost)
router.patch('/',updatePost)


export default router