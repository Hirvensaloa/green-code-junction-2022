import { authMiddleware } from './middlewares/authMiddleware.js';
import { router } from './routes/routes.js';

const app = new Application();
app.use(Session.initMiddleware());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(router.routes());

app.listen({ port: 7777 });
