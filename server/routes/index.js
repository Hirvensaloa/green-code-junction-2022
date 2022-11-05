import { Router } from 'https://deno.land/x/oak/mod.ts';
import { processLogin, registerUser } from './controller/authController.js';
import { uploadFile } from './controller/fileController.js';
import { fetchPost, fetchPostList } from './controller/postController.js';

const router = new Router();

router.post('/login', processLogin);
router.post('/register', registerUser);

router.post('/api/upload/file', uploadFile);
router.get('/api/posts', fetchPostList);
router.get('/api/posts/:id', fetchPost);

export { router };
