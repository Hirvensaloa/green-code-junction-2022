import { Router } from 'https://deno.land/x/oak/mod.ts';
import { processLogin, registerUser } from './controller/authController.js';
import { uploadFile } from './controller/fileController.js';

const router = new Router();

router.post('/login', processLogin);
router.post('/register', registerUser);

router.post('/api/file', uploadFile);

export { router };
