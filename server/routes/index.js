import { Router } from 'https://deno.land/x/oak/mod.ts';
import { processLogin, registerUser } from './controller/authController.js';
import { uploadFile } from './controller/fileController.js';
import { fetchPostList, uploadPost } from './controller/postController.js';

const router = new Router();

router.post('/login', processLogin);
router.post('/register', registerUser);

router.get('/api/posts', fetchPostList);

router.post('/api/upload/text', uploadPost);
router.post('/api/upload/file', uploadFile);

export { router };
