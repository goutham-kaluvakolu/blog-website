import Avatar from "../components/Avatar";
import Dot from "../components/Dot";
import { useBlog } from "../hooks"
import { Link, useParams } from 'react-router-dom';
import { getDate, getReadTime } from "../utilites";
import Shares from "../components/Shares";
import Likes from "../components/Likes";
import Blogskeleton from "../components/Blogskeleton";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id || "abc")
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
          <Avatar authorName={blog.authorName} width="w-10" hieght="h-10" />
          {/* user info */}
          <div className="ml-2 ">
            <div className="flex items-center"><div className=" font-bold mr-2"><Link to={`/Author/${blog.authorId}`}>{blog.authorName}</Link></div><Dot /><div className="text-teal-600 font-medium ml-2">Follow</div></div>
            <div className="flex items-center text-slate-500 font-medium"><div className="mr-2">{`${time} min`}</div><Dot /><div className="ml-2">{getDate(blog.createdAt)}</div></div>
          </div>


        </div>
        {/* stats and icons*/}
        <div className="flex border-b-2 p-4 text-base text-slate-500">
          <Likes count={blog.likes} blogId={blog.id} />
          <Shares count={blog.shareCount} />


        </div>

        {/* content */}
        <div className="p-4 pt-10">{blog.content.split('\n').map((line, index) => (
          <div key={index}>{line === '' ? <br /> : line}</div>
        ))}</div>
        <Commentbox blogId={blog.id} />


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
    <div className="border-t-2 p-5">
      <div>comments</div>
      <div className="flex p-5">
      <input className="w-full" placeholder="your comment" type="text" onChange={(e) => handleChange(e)} />
      <button className=" p-2 bg-lime-400" onClick={handleSubmit}>submit</button>
      </div>
      
      <div>{comments.length>0?(comments.map((comment: commentProps) => {
        return (
          <div className="p-5 border-b-2" key={comment.author}>
            <div className="flex mb-2">
            <div className="mr-2">{<Avatar authorName={comment.author}/>}</div><div>{comment.author}</div>
            </div>
            <div>{comment.content}</div>
          </div>
        )
      })):(<div className="p-5 text-center">
        No comments yet
      </div>)}</div>
    </div>
  )
}
