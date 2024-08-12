import Avatar from "../components/Avatar";
import Dot from "../components/Dot";
import { useBlog, useBlogs } from "../hooks"
import { Link, useParams } from 'react-router-dom';
import { getDate, getReadTime } from "../utilites";
import Shares from "../components/Shares";
import Likes from "../components/Likes";
import Blogskeleton from "../components/Blogskeleton";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id || "abc")
  const { blogs } = useBlogs()
  if (loading) {
    return (
      <div>
        <Blogskeleton />
      </div>
    )
  }
  const time = getReadTime(blog.content)
  return (
    <div className="flex justify-center">
      <div className="ml-5 mr-5 w-full md:w-2/3">
        {/* <header></header> */}
        <div className="text-5xl font-bold mb-10 mt-10">{blog.title}</div>
        {/* user details */}
        <div className="flex items-center border-b-2 pb-7 ">
          {/* user avator  */}
          <Avatar authorName={blog.authorName} width="w-10" height="h-10" />
          {/* user info */}
          <div className="ml-2 ">
            <div className="flex items-center"><div className=" font-bold mr-2"><Link to={`/Author/${blog.authorId}`}>{blog.authorName}</Link></div><Dot /><div className=" p-2 text-teal-600 font-medium ml-2 hover:bg-orange hover:rounded cursor-pointer">Follow</div></div>
            <div className="flex items-center text-slate-500 font-medium"><div className="mr-2">{`${time} min`}</div><Dot /><div className="ml-2">{getDate(blog.createdAt)}</div></div>
          </div>


        </div>
        {/* stats and icons*/}
        <div className="flex border-b-2 p-4 text-base text-slate-500 cursor-pointer">
          <Likes count={blog.likes} blogId={blog.id} />
          <Shares count={blog.shareCount} />


        </div>

        {/* content */}

        <div className="m-10">
        <ReactMarkdown children={blog.content} remarkPlugins={[remarkGfm]} />

        </div>
        <Commentbox blogId={blog.id} />
        {/* recomdecation */}
        <div className="m-6">
          <div className="text-3xl">Recommendations</div>
          <div className="flex flex-col items-center justify-center m-2">
          {
            blogs.slice(0, 3).map((blog) =>
              <BlogCard id={blog.id} key={blog.id} authorName={blog.authorName} content={blog.content} title={blog.title} authorId={blog.authorId} blogDate={blog.updatedAt} tags={blog.tagNames} />
            )
          }
        </div>
        </div>
       
       </div>
      </div>
  )
}

export default Blog


const Commentbox = ({ blogId }: { blogId: string }) => {

  type commentProps =
    {
      "content": string,
      "author": string
    }

  const [comment, setComment] = useState<string>("")
  const [newComment, setNewComment] = useState(true)

  const [comments, setComments] = useState<commentProps[]>([])
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/comment`, {
      params: { blogId: blogId, }, // Send tag in the request body
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then((res) => setComments(res.data.comments))
  }, [newComment])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  const handleSubmit = () => {
    axios.post(`${BACKEND_URL}/api/v1/comment`, {
      userId: localStorage.getItem("userId"),
      blogId: blogId,
      content: comment
    },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
      }
    )

    setNewComment(prev => !prev)
    console.log("***", comments)
  }
  return (
    <div className="border-t-2 border-b-2 p-5">
      <div className="text-3xl">comments (<span>{comments.length}</span>)</div>
      <div className="flex p-5 shadoweffon">
      <input className="w-full bg-white focus:outline-none" placeholder="your comment" type="text" onChange={(e) => handleChange(e)} />
      <button className=" p-2 bg-lime-400 bg-orange rounded m-2" onClick={handleSubmit}>submit</button>
      </div>
      
      <div>{comments.length>0?(comments.map((comment: commentProps) => {
        return (
          <div className="p-5 border-b-2 m-4 " key={comment.author}>
            <div className="flex mb-2">
            <div className="mr-2">{<Avatar authorName={comment.author}/>}</div><div className="text-lg font-semibold">{comment.author}</div>
            </div>
            <div className="text-slate-500 m-4">{comment.content}</div>
          </div>
        )
      })):(<div className="p-5 text-center mt-4">
        No comments yet
      </div>)}</div>
    </div>
  )
}
