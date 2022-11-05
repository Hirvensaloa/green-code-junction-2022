import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { Session } from 'https://deno.land/x/oak_sessions/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

import { authMiddleware, scoreMiddleware } from './middlewares/';
import { router } from './routes/index.js';

const app = new Application();
app.use(Session.initMiddleware());

app.use(oakCors());
app.use(authMiddleware);
app.use(scoreMiddleware);
app.use(router.routes());

app.listen({ port: 7777 });
