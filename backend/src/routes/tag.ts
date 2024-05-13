import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { Post, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from '@goutham4331/blog-website-commons';


export const tagRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


tagRouter.use('/*', async (c, next) => {
    const user_jwt: string = await c.req.header("authorization") || "";
    const token_jwt: string = user_jwt.split(" ")[1]
    const secret = c.env.JWT_SECRET

    try {
        const vaidUser = await verify(token_jwt, secret)
        console.log("/tags", vaidUser)
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


tagRouter.post('/', async (c) => {
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
        const tags = body.tags
        // If tags are provided, associate them with the blog post
        if (tags && tags.length > 0) {
            await Promise.all(tags.map(async (tag: string) => {
                // Check if the tag already exists
                let existingTag = await prisma.tag.findUnique({
                    where: { name: tag }
                });

                // If the tag doesn't exist, create it
                if (!existingTag) {
                    existingTag = await prisma.tag.create({
                        data: {
                            name: tag
                        }
                    });
                }

                // Associate the tag with the blog post
                await prisma.tagPost.create({
                    data: {
                        postId: blog.id,
                        tagId: existingTag.id
                    }
                });
            }));
        }

        return c.json({
            id: blog.id
        });
    } catch (error) {
        console.error("Error creating blog post:", error);
        c.status(500)
        c.json({
            error: "An error occurred while creating the blog post."
        });
    }

})

tagRouter.put('/', async (c) => {
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

tagRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("*** tag bulk*******")
    const tag = c.req.query('tag')
    console.log(tag)
    try{
        const tags = await prisma.tag.findMany({
            where: {
              name: {
                contains: tag // Assuming tag is the user-provided parameter
              }
            },
            select: {
              name: true // Select only the 'name' field
            }
          });
          return c.json({
            tags
          })
    }
    catch{
        return c.json({})
    }


})

tagRouter.get('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("*** tag create*******")
    const newTag = c.req.query('tag')
    console.log(newTag)
    if (newTag){
        try{
            const tag = await prisma.tag.create({
                data: {
                  name: newTag
                }
              });
              return c.json({tag})
        }
        catch{
            return c.json({})
        }
    }
    return c.json({})

  


})

tagRouter.get('/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("*** tag all*******")
    // const tag = c.req.query('tag')
    // console.log(tag)
    try{
        const rawTags = await prisma.tag.findMany({
            select: {
                name: true // Only select the name field
            }
        });
        console.log(rawTags)
        // const tags=rawTags.map((tag)=>{return tag.name})
          return c.json({
            tags:rawTags
          })
    }
    catch{
        return c.json({})
    }
})

tagRouter.post('/user', async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        // Step 1: Remove all tags associated with the user
        await prisma.tagUser.deleteMany({
            where: {
                userID: userId
            }
        });

        // Step 2: Add the new tags provided in the request
        const tagNames = body.tags;
        await Promise.all(tagNames.map(async (tagName:string) => {
            // Check if the tag already exists
            let existingTag = await prisma.tag.findUnique({
                where: { name: tagName }
            });

            // If the tag doesn't exist, create it
            if (!existingTag) {
                existingTag = await prisma.tag.create({
                    data: {
                        name: tagName
                    }
                });
            }

            // Associate the tag with the user
            await prisma.tagUser.create({
                data: {
                    tagId: existingTag.id,
                    userID: userId
                }
            });
        }));

        // Step 3: Retrieve the updated list of tags associated with the user
        const updatedTags = await prisma.tagUser.findMany({
            where: {
                userID: userId
            },
            include: {
                tag: true
            }
        });

        // Extract tag names from the updated list
        const tags = updatedTags.map(tag => tag.tag.name);

        // Step 4: Send the updated list of tags in the response
        return c.json({ tags });
    } catch (error) {
        // Handle errors
        console.error("Error updating user tags:", error);
         c.status(500)
         return c.json({error:("Internal Server Error")});
    }
});

tagRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    console.log("*** tag /:tag*******");

    const userId = c.req.param('id');
    console.log(userId);

    try {
        const tagIds = await prisma.tagUser.findMany({
            where: {
                userID: userId
            },
            select: {
                tagId: true
            },
            distinct: ["tagId"]
        });

        // Extracting tag IDs from the array of objects
        const tagIdArray = tagIds.map(tag => tag.tagId);

        const tags = await prisma.tag.findMany({
            where: {
                id: {
                    in: tagIdArray // Use the array of tag IDs
                }
            },
            select: {
                name: true
            }
        });
        
        return c.json({
            tags
        });
    } catch (error) {
        console.error("Error:", error);
        return c.json({ error: "An error occurred while fetching tags." });
    }
});
