
import BlogCard from "../components/BlogCard";
import Blogskeleton from "../components/Blogskeleton";
import { useBlogs } from "../hooks";
const Blogs = () => {
    const {loading,blogs} = useBlogs()
    return (
        
        <div className="flex flex-col items-center">
            {loading&&(<div className="w-full flex flex-col items-center"><Blogskeleton/><Blogskeleton/><Blogskeleton/><Blogskeleton/></div>)}
            {blogs.map((blog: {
                "authorName": string,
                "content": string,
                "title": string
                "id":string
            }) => <BlogCard id={blog.id} key={blog.id} authorName={blog.authorName} content={blog.content} title={blog.title} />)}
        </div>

    )
}

export default Blogs