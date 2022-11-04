import { Router } from 'https://deno.land/x/oak/mod.ts';
import { processLogin, registerUser } from './controller/authController';

const router = new Router();

router.post('/login', processLogin).post('/register', registerUser);

export { router };
