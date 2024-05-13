
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Blogskeleton from "../components/Blogskeleton";
import SecondaryNav from "../components/SecondaryNav";
import { useBlogs } from "../hooks";
import { useUserTags } from "../hooks/useUserTags";

type blogProps= {
        "authorName": string,
        "content": string,
        "title": string
        "id":string,
        "authorId":string,
        "updatedAt":string,
        "tagNames":string[]
    }

const Blogs = () => {
    const {loading,blogs} = useBlogs()
    const { userTagsLoading, userTags } = useUserTags(localStorage.getItem("userId") || 'admin');
    const [activeTag,setActiveTag]=useState("Foryou")
    const [displayBlogs,setDisplayBlogs] = useState<blogProps[]>([])
    useEffect(()=>{
        setDisplayBlogs([...blogs])
    },[loading,blogs])

    function handleActiveTagChange(activeTag: string) {
        console.log(activeTag);
        setActiveTag(activeTag);
        // Filter the blogs based on the activeTag
        if (activeTag === "Foryou") {
            setDisplayBlogs(blogs); // If no tag is selected, display all blogs
        } else {
            setDisplayBlogs(blogs.filter(blog => blog.tagNames.includes(activeTag)));
        }
    }
    

    return (
        
        <div className="flex flex-col items-center">
            {!userTagsLoading&&(<SecondaryNav tags={userTags} activeTag={activeTag} handleActiveTagChange={handleActiveTagChange}/>)}
            {loading&&(<div className="w-full flex flex-col items-center"><Blogskeleton/><Blogskeleton/><Blogskeleton/><Blogskeleton/></div>)}
            {displayBlogs.map((blog:blogProps) => 

            <BlogCard id={blog.id} key={blog.id} authorName={blog.authorName} content={blog.content} title={blog.title} authorId={blog.authorId} blogDate={blog.updatedAt} tags={blog.tagNames}/>)}
        </div>

    )
}

export default Blogs
