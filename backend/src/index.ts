import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'
import { tagRouter } from './routes/tag';
import { commentRouter } from './routes/comment';
import { defaultRouter } from './routes/default';
import { followRoute } from './routes/follow';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();

app.use('/api/*', cors())
app.route("/api/v1/default",defaultRouter);
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);
app.route("/api/v1/follow",followRoute);
app.route("/api/v1/tag",tagRouter);
app.route("/api/v1/comment",commentRouter);

export default app
