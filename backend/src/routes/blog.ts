import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from '@goutham4331/blog-website-commons';


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


blogRouter.use('/*', async (c, next) => {
    const user_jwt: string = await c.req.header("authorization") || "";
    const token_jwt: string = user_jwt.split(" ")[1]
    const secret = c.env.JWT_SECRET

    const vaidUser = await verify(token_jwt, secret)
    if (vaidUser.id) {
        c.set('userId', vaidUser.id)
        console.log("***middile*******")
        await next()
    }
    else {
        c.status(403)
        return c.json({
            error: "login again"
        })
    }

})


blogRouter.post('/', async (c) => {
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const sucess = createBlogInput.safeParse(body)
    if (!sucess.success){
      c.status(411)
      return c.json({
        error:"incorrect inputs"
      })
    }
  
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const sucess = updateBlogInput.safeParse(body)
    if (!sucess.success){
        c.status(411)
        return c.json({
          error:"incorrect inputs"
        })
      }
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            //   authorId:userId
        }
    })
    return c.json({
        id: blog.id
    })
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("***bulk*******")

    // const body = await c.req.json()
    try {
        const blogs = await prisma.post.findMany()
        return c.json({ blogs })
    }
    catch (e) {
        c.status(404)
        return c.json({
            error: "No blogs yet"
        })
    }

})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const blogid= c.req.param("id")
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: blogid
            }
        })
        return c.json({ blog })

    }
    catch (e) {
        c.status(404)
        return c.json({
            error: "blog not found"
        })
    }

})


