import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { Post, PrismaClient } from '@prisma/client/edge'
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


blogRouter.post('/', async (c) => {
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const sucess = createBlogInput.safeParse(body)
    if (!sucess.success) {
        c.status(411)
        return c.json({
            error: "incorrect inputs"
        })
    }

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,

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
    if (!sucess.success) {
        c.status(411)
        return c.json({
            error: "incorrect inputs"
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

    try {
        const rawBlogs = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });
        const blogs = rawBlogs.map(blog => ({
            ...blog,
            authorName: blog.author.name ? blog.author.name : "unknown",
            authorId: blog.author.id,
            updatedAt: blog.updatedAt ? blog.updatedAt : blog.createdAt,
        }));

        return c.json(blogs)

    }
    catch (e) {
        c.status(404)
        return c.json({
            error: "No blogs yet"
        })
    }

})


blogRouter.get('/bookmarks', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("***bookmarks*******")
    
    try {
        const blogs = await prisma.post.findMany({
            where: {
              bookmarks: {
                some: {
                  authorId: c.get("userId")
                }
              }
            }
          });
          
        return c.json(blogs)

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

    console.log("****/:id*******")

    // const body = await c.req.json()
    const blogid = c.req.param("id")
    console.log("blogid", blogid)
    // console.log("body",body)

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: blogid
            }
        });

        // If blog exists, fetch the corresponding user using the authorId
        if (blog) {
            const userName = await prisma.user.findFirst({
                where: {
                    id: blog.authorId
                }
            });

            // Determine the user name or set it to "Anonymous" if not found
            const authorName = userName ? userName.name : 'Anonymous';

            // Add user name to the blog object
            const blogWithUserName = { ...blog, authorName };

            // Return the blog object with user name in the response
            return c.json({ blog: blogWithUserName });


        }
    }
    catch (e) {
        c.status(404)
        return c.json({
            error: "blog not found"
        })
    }

})


blogRouter.get('/user/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log("****user/:id*******")

    const authorId = c.req.param("id")
    console.log("authorId", authorId)

    try {
        const blogs = await prisma.post.findMany({
            where: {
                authorId: authorId
            }
        });
        const authorName = await prisma.user.findFirst({
            where: {
                id: authorId
            },
            select: {
                name: true
            }
        });

        return c.json({
            blogs, authorName
        })

    }
    catch (e) {
        c.status(404)
        return c.json({
            error: "blog not found"
        })
    }

})


blogRouter.post('/bookmark', async (c) => {
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()


    if (body.bookMark) {
        try {
            const blog = await prisma.bookmark.create({
                data: {
                    postId: body.blogId,
                    authorId: userId,
                }
            })
            return c.json({
                id: blog
            })
        }
        catch {
            c.status(502)
            return c.json({
                error: "could not insert"
            })

        }

    }
    else {
        try {
            const blog = await prisma.bookmark.delete({
                where: {
                    postId_authorId: {
                        postId: body.blogId,
                        authorId: userId,
                    }
                }
            })
            return c.json({
                id: blog
            })

        }
        catch {
            c.status(502)
            return c.json({
                error: "could not delete"
            })
        }

    }

})


