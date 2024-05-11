import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import Bookmark from "./Bookmark"

type blogcardProps = {
    "id": string
    "authorName": string,
    "content": string,
    "title": string,
    "authorId"?: string
}



const BlogCard = ({ id, authorName, content, title, authorId }: blogcardProps) => {
    return (
        <div className="border-b-2 w-2/3 h-38 mt-6 ">
            {/* header */}
            <div></div>
            <div className="flex items-center ">
                <Avatar authorName={authorName} />
                {/* name */}
                <Link to={`/Author/${authorId}`} className="mr-2">{authorName}</Link>
                {/* dot */}
                <span className="mr-2 pb-2">.</span>
                {/* date */}
                <span className="text-stone-500">3 dec 2224</span>
            </div>
            <Link to={`/blog/${id}`}>
                {/* title */}
                <div className="font-bold text-3xl">
                    {title}
                </div>
                {/* few lines */}
                <article className="text-ellipsis overflow-hidden text-slate-600 text-base">
                    {content}
                </article>
            </Link>
            {/* footer */}
            <div className="flex flex-row-reverse mb-6">
                {/* icons */}
                <Bookmark />

            </div>

        </div>
    )
}

export default BlogCard



