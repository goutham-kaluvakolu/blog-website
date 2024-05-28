import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const commentRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


commentRouter.use('/*', async (c, next) => {
    const user_jwt: string = await c.req.header("authorization") || "";
    const token_jwt: string = user_jwt.split(" ")[1]
    const secret = c.env.JWT_SECRET

    try {
        const vaidUser = await verify(token_jwt, secret)
        console.log("hvghv", vaidUser)
        if (vaidUser.id) {
            c.set('userId', vaidUser.id)
            console.log("***middile accept vaild user*******")
            await next()
        }
        else {
            c.status(403)
            return c.json({
                error: "login again"
            })
        }
    }
    catch {
        c.status(401)
        return c.json({
            error: "jwt expired"
        })
    }


})

commentRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogId = c.req.query("blogId")


    console.log("***blogId*******",blogId)

    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: blogId,
            },
            include: {
                // author: true,
                author: {
                    select: {
                        name: true, // Select the username field from the author table
                    },
                },
                post: true,
            },
        });

        // Return an empty array if no comments found
        if (!comments || comments.length === 0) {
            return c.json({comments:[]});
        }

        const formattedComments = comments.map(comment => ({
            // id: comment.id,
            content: comment.content,
            author: comment.author.name, // Extract the author's username
        }));

        return c.json({comments:formattedComments});
    } catch (error) {
        console.error('Error fetching comments:', error);
        c.status(500)
        return c.json({ error: 'Error fetching comments' });
    }

})


commentRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const { userId, blogId, content } = await c.req.json();

    try {
        // Check if userId and blogId are provided
        if (!userId || !blogId) {
             c.status(400)
            return c.json({ error: 'userId and blogId are required' });
        }

        // Create the comment
        const newComment = await prisma.comment.create({
            data: {
                content,
                authorId: userId,
                postId: blogId,
            },
            include: {
                author: true,
                post: true,
            },
        });

        return c.json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        c.status(500)
        return c.json({ error: "An error occurred while creating the comment." });
    }

})

