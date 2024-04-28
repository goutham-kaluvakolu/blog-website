import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signinInput,signupInput} from '@goutham4331/blog-website-commons'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
  }>();


  userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    console.log(body)
    const sucess = signupInput.safeParse(body)
    if (!sucess.success){
      c.status(411)
      return c.json({
        error:"incorrect inputs"
      })
    }
    try{
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name:body.username
        }
      })
    
      const payload = {
        id: user.id,
      }
      const secret = c.env.JWT_SECRET
      const token = await sign(payload, secret)
    
      return c.json({ "jwt": token })
    }
    catch(e){
      c.status(409)
      return c.json({ "error": "user exists" })

    }
   
  
  })
  
  userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const sucess = signinInput.safeParse(body)
    if (!sucess.success){
      c.status(411)
      return c.json({
        error:"incorrect inputs"
      })
    }
  
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })
    console.log(body.password,user)
    
    if (!user) {
      c.status(403)
      return c.json({
        error: "user not found"
      })
    }
  
    const payload = { id: user.id }
    const secret = c.env.JWT_SECRET
    const token = await sign(payload, secret)
    return c.json({
      jwt: token
    })
  })