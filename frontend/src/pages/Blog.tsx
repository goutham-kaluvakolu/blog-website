import Avatar from "../components/Avatar";
import Dot from "../components/Dot";
import { useBlog } from "../hooks"
import { Link, useParams } from 'react-router-dom';
import { getDate, getReadTime } from "../utilites";
import Shares from "../components/Shares";
import Likes from "../components/Likes";

const blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id || "abc")
  if (loading) {
    return (
      <div>
        loading...
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
          <Likes count={blog.likes} blogId={blog.id}/>
          <Shares count={blog.shareCount} />
          
          
        </div>

        {/* content */}
        <div className="p-4 pt-10">{blog.content}</div>
      </div>
    </div>
  )
}

export default blog



