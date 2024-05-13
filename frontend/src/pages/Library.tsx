import BlogCard from "../components/BlogCard"
import Blogskeleton from "../components/Blogskeleton"
import { useBookmarks } from "../hooks/useBookmarks"

const Library = () => {
    const {loading,blogs} = useBookmarks()

  return (
    <div className="flex flex-col items-center">
    {loading&&(<div className="w-full flex flex-col items-center"><Blogskeleton/><Blogskeleton/><Blogskeleton/><Blogskeleton/></div>)}
    {blogs.map((blog: {
        "authorName": string,
        "content": string,
        "title": string
        "id":string,
        "authorId":string,
        "updatedAt":string
    }) => 

    <BlogCard id={blog.id} key={blog.id} authorName={blog.authorName} content={blog.content} title={blog.title} authorId={blog.authorId} blogDate={blog.updatedAt} bookMark={true} tags={[]}/>)}
</div>
  )
}

export default Library


