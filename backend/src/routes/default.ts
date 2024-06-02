import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { Post, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from '@goutham4331/blog-website-commons';


export const defaultRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

defaultRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("***get blogs in bulk*******")

    const count = 5 // Number of latest blog posts to fetch

    try {
        // Fetch the latest n blog posts
        const latestBlogs = await prisma.post.findMany({
            take: count,
            orderBy: {
                createdAt: 'desc' // Order by creation date in descending order to get the latest posts
            },
            include: {
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });

        // Initialize an array to store blog info with tag names
        const blogInfoArray = [];

        // Iterate over each latest blog post
        for (const blog of latestBlogs) {
            // Find tag IDs associated with the blog post
            const tagIds = await prisma.tagPost.findMany({
                where: {
                    postId: blog.id
                },
                select: {
                    tagId: true
                }
            });

            // Extract tag IDs from the result
            const tagIdsArray = tagIds.map(tag => tag.tagId);

            // Find tag names corresponding to the tag IDs
            const tags = await prisma.tag.findMany({
                where: {
                    id: {
                        in: tagIdsArray
                    }
                },
                select: {
                    name: true
                }
            });

            // Extract tag names from the result
            const tagNames = tags.map(tag => tag.name);

            // Combine blog details with tag names
            const bloginfo = {
                ...blog,
                authorName: blog.author.name ? blog.author.name : "unknown",
                authorId: blog.author.id,
                updatedAt: blog.updatedAt ? blog.updatedAt : blog.createdAt,
                tagNames: tagNames
            };

            // Push combined blog info to the array
            blogInfoArray.push(bloginfo);
        }

        return c.json(blogInfoArray);
    } catch (e) {
        c.status(404);
        return c.json({
            error: "No blogs found"
        });
    }

})



defaultRouter.get('/qoute', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("***get qoutes randomly*******")
    //get all qoutes from the database
    try{
        const qoutes = await prisma.qoutes.findMany();
        return c.json({qoutes:qoutes});
    }
    catch(e){
        c.status(404);
        return c.json({
            error: "No qoutes found"
        });
    }
})

defaultRouter.get('/user/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log("****get all blogs of a author/:id*******")

    const authorId = c.req.param("id")
    console.log("authorId", authorId)

    try {
        const blogs = await prisma.post.findMany({
            where: {
                authorId: authorId
            },
            include: {
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
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
        const blogInfoArray = [];
        for (const blog of blogs) {
            // Find tag IDs associated with the blog post
            const tagIds = await prisma.tagPost.findMany({
                where: {
                    postId: blog.id
                },
                select: {
                    tagId: true
                }
            });

            // Extract tag IDs from the result
            const tagIdsArray = tagIds.map(tag => tag.tagId);

            // Find tag names corresponding to the tag IDs
            const tags = await prisma.tag.findMany({
                where: {
                    id: {
                        in: tagIdsArray
                    }
                },
                select: {
                    name: true
                }
            });

            // Extract tag names from the result
            const tagNames = tags.map(tag => tag.name);

            // Combine blog details with tag names
            const bloginfo = {
                ...blog,
                authorName: blog.author.name ? blog.author.name : "unknown",
                authorId: blog.author.id,
                updatedAt: blog.updatedAt ? blog.updatedAt : blog.createdAt,
                tags: tagNames
            };

            // Push combined blog info to the array
            blogInfoArray.push(bloginfo);
        }
        return c.json({
            blogs:blogInfoArray
        })

    }
    catch (e) {
        c.status(404)
        return c.json({
            error: "blog not found"
        })
    }

})

defaultRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log("****get blog by/:id*******")

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