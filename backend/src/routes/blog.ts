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
    try {
        // Create the blog post
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            }
        });
        console.log("blog",blog)
        const tags = body.tags
        // If tags are provided, associate them with the blog post
        if (tags && tags.length > 0) {
            console.log(tags)
            await Promise.all(tags.map(async (tag: string) => {
                // Check if the tag already exists
                console.log(tag)
                let existingTag = await prisma.tag.findUnique({
                    where: { name: tag }
                });

                // If the tag doesn't exist, create it
                if (!existingTag) {
                    console.log("creating",tags)
                    existingTag = await prisma.tag.create({
                        data: {
                            name: tag
                        }
                    });
                }
                
                console.log(existingTag)
                // Associate the tag with the blog post
                await prisma.tagPost.create({
                    data: {
                        postId: blog.id,
                        tagId: existingTag.id
                    }
                });
            }));
            
        }

        const resblog = await prisma.post.findFirst({
            where: {
                id: blog.id
            },
            include: {
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                },
                TagPost: true
            }
        });
        return c.json({
            blog:resblog
        });
    } catch (error) {
        console.error("Error creating blog post:", error);
        c.status(500)
        c.json({
            error: "An error occurred while creating the blog post."
        });
    }

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

blogRouter.get('/tags', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()

    console.log("***tags*******",body)

    try {
        
        const tag = body.tag
        console.log("***tags*******", tag,body);

        // Fetch all tags that are similar to the provided tag value
        const similarTags = await prisma.tag.findMany({
            where: {
                name: {
                    contains: tag // Filter tags that contain the provided tag value
                }
            }
        });

        return c.json(similarTags);
    } catch (error) {
        console.error("Error fetching tags:", error);
         c.status(500)
        return c.json({
            error: "An error occurred while fetching tags."
        });
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


blogRouter.put('/like', async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log("****likes********",body)
    try {
        const { blogId, likes } = body;
        console.log(blogId, likes)

        // Update the like value for the specified blog post
        const updatedBlog = await prisma.post.update({
            where: { id: blogId }, // Specify the blog post ID to update
            data: { likes }, // Update the likes count
        });

        // Return the updated blog post
        return c.json({ updatedBlog });
    } catch (error) {
        // Handle errors
        console.error("Error updating user tags:", error);
         c.status(500)
         return c.json({error:("Internal Server Error")});
    }
});