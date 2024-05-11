import { Link } from "react-router-dom"
import Avatar from "./Avatar"

type blogcardProps = {
    "id":string
    "authorName": string,
    "content": string,
    "title": string,
    "authorId"?:string
}



const BlogCard = ({ id ,authorName, content, title,authorId }: blogcardProps) => {
    return (
        <div className="border-b-2 mb-2 w-2/3 h-28 ">
            <Link to={`/blog/${id}`}>
            {/* header */}
            <div></div>
            <div className="flex items-center ">
                <Avatar authorName={authorName}/>
                {/* name */}
                <Link to={`/Author/${authorId}`} className="mr-2">{authorName}</Link>
                {/* dot */}
                <span className="mr-2 pb-2">.</span>
                {/* date */}
                <span className="text-stone-500">3 dec 2224</span>
            </div>

            {/* title */}
            <div className="font-bold text-3xl">
                {title}
            </div>
            {/* few lines */}
            <article className="text-ellipsis overflow-hidden text-slate-600">
                {content}
            </article>
            {/* footer */}
            <div>
                {/* icons */}
            </div>
            </Link>
        </div>
    )
}

export default BlogCard



