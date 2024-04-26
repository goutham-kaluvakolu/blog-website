import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();

// app.use('/*', async (c, next) => {
//   console.log("first**************** middle ware")

//   next()
// })


app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);





export default app
