import Avatar from "../components/Avatar";
import Dot from "../components/Dot";
import { useBlog } from "../hooks"
import { useParams } from 'react-router-dom';
import { getReadTime } from "../utilites";

const blog = () => {
  const {id} = useParams();
  const {loading,blog} =useBlog(id||"abc")
  if (loading){
    return(
      <div>
        loading...
      </div>
    )
  }
  const time = getReadTime(blog.content)
  return (
    <div className="ml-5 mr-5">
      {/* <header></header> */}
      <div className="text-5xl font-bold mb-10 mt-10">{blog.title}</div>
      {/* user details */}
      <div className="flex items-center border-b-2 pb-7 mb-10 ">
        {/* user avator  */}
        <Avatar authorName={blog.authorName} width="w-10" hieght="h-10"/>
        {/* user info */}
        <div className="ml-2">
          <div className="flex items-center"><div className=" font-bold mr-2">{blog.authorName}</div><Dot/><div className="text-teal-600 font-medium ml-2">Follow</div></div>
          <div className="flex items-center text-slate-500 font-medium"><div className="mr-2">{`${time} min`}</div><Dot/><div className="ml-2">pubished date</div></div>
        </div>
      </div>
      {/* stats and icons*/}
      {/* content */} 
      <div>{blog.content}</div>     
    </div>
  )
}

export default blog