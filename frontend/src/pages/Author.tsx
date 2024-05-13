import { useParams } from "react-router-dom"
import Avatar from "../components/Avatar"
import { useUserBlogs } from "../hooks/useUserBlogs"
import Blogskeleton from "../components/Blogskeleton";
import BlogCard from "../components/BlogCard";

const Author = () => {
    const { id } = useParams();
    const { loading, blogs, authorName } = useUserBlogs(id || "unknown")
    if (loading) {
        return (
            <div>
                <Blogskeleton />
                <Blogskeleton />
                <Blogskeleton />
            </div>
        )
    }
    return (
        <div>
            <div className="flex justify-between">
                <div className="hidden font-semibold text-5xl md:block">{authorName}</div>
                <div className="md:w-1/3 md:border-l-4 md:p-5">
                    <div className="flex md:flex-col">
                        <Avatar authorName={authorName} width="w-10" hieght="h-10" />
                        <div>
                            <div>{authorName}</div>
                            <div>24k Followes</div>
                        </div>
                    </div>
                    <button className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Follow
                    </button>
                </div>
            </div>

            <div className="border-r-4 w-2/3">
                {blogs.map((blog) => {
                    return <BlogCard id={blog.id} authorName={authorName} content={blog.content} title={blog.title} authorId={blog.authorId} blogDate={blog.updatedAt} tags={blog.tags}/>;
                })}
            </div>
        </div>
    )
}

export default Author

