
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Blogskeleton from "../components/Blogskeleton";
import SecondaryNav from "../components/SecondaryNav";
import { useBlogs } from "../hooks";
import { useUserTags } from "../hooks/useUserTags";
import Pagination from "../components/Pagination";

type blogProps = {
    "authorName": string,
    "content": string,
    "title": string
    "id": string,
    "authorId": string,
    "updatedAt": string,
    "tagNames": string[]
}

const Blogs = () => {
    const { loading, blogs } = useBlogs()
    const { userTagsLoading, userTags } = useUserTags(localStorage.getItem("userId") || 'admin');
    const [activeTag, setActiveTag] = useState("Foryou")
    const [displayBlogs, setDisplayBlogs] = useState<blogProps[]>([])
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        setDisplayBlogs([...blogs])
    }, [loading, blogs])



    function handleActiveTagChange(activeTag: string) {
        console.log(activeTag);
        setActiveTag(activeTag);
        // Filter the blogs based on the activeTag
        if (activeTag === "Foryou") {
            //split blogs array into n arrays and each array contains 5 elements
            setDisplayBlogs(blogs); // If no tag is selected, display all blogs
        } else {
            setDisplayBlogs(
                blogs.filter(blog => blog.tagNames.includes(activeTag))
            );
        }
    }


    return (

        <div className="flex flex-col items-center">
            {!userTagsLoading && (<SecondaryNav tags={userTags} activeTag={activeTag} handleActiveTagChange={handleActiveTagChange} />)}
            {loading && (<div className="w-full flex flex-col items-center"><Blogskeleton /><Blogskeleton /><Blogskeleton /><Blogskeleton /></div>)}
            {

                displayBlogs.slice(5 * (currentPage - 1), 5 * currentPage).map((blog: blogProps) => {
                    return (
                        <BlogCard id={blog.id} key={blog.id} authorName={blog.authorName} content={blog.content} title={blog.title} authorId={blog.authorId} blogDate={blog.updatedAt} tags={blog.tagNames} />

                    )
                }
                )
            }
            <Pagination handlePageChange={setCurrentPage} currentPage={currentPage} totalPages={Math.ceil(displayBlogs.length / 5)} />

        </div>

    )
}

export default Blogs
