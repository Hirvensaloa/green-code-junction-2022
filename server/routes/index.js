import { Router } from 'https://deno.land/x/oak/mod.ts';
import { processLogin, registerUser } from './controller/authController.js';
import { getFiles, uploadFile } from './controller/fileController.js';
import {
  fetchPost,
  fetchPostList,
  uploadPost,
} from './controller/postController.js';

const router = new Router();

router.post('/login', processLogin);
router.post('/register', registerUser);

router.get('/api/posts', fetchPostList);
router.get('/api/posts/:id', fetchPost);
router.post('/api/posts', uploadPost);

router.post('/api/upload/file', uploadFile);
router.get('/api/files', getFiles);

export { router };
