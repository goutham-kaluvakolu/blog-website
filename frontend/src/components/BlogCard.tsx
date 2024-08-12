import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import Bookmark from "./Bookmark"
import GenBadge from "./GenBadge"
import { getDate, getReadTime } from "../utilites"
import removeMarkdown from "markdown-to-text";
import Tooltip from "./Tooltip"


type blogcardProps = {
    "id": string
    "authorName": string,
    "content": string,
    "title": string,
    "authorId"?: string,
    "blogDate": string,
    "bookMark"?: boolean,
    "tags": string[]
}



const BlogCard = ({ id, authorName, content, title, authorId, blogDate, bookMark, tags }: blogcardProps) => {
    return (
        <div className="border-2 p-6 w-full h-38 mt-8 md:w-2/3 bg-white shadoweff rounded">
            {/* header */}
            <div></div>
            <div className="flex items-center mb-6 space-x-2">
                <Avatar authorName={authorName} height="h-8"/>
                {/* name */}
                <Link to={`/Author/${authorId}`} className="mr-1 font-medium text-base ">{authorName}</Link>
                {/* dot */}
                <span className="mr-1 pb-2">.</span>
                {/* date */}
                <span className="text-stone-500 text-sm">{getDate(blogDate)}</span>
            </div>
            <div className=" mb-6"><Link to={`/blog/${id}`} className="bg-rose-200">
                {/* title */}
                <div className="font-bold text-3xl">
                    {title}
                </div>
                {/* few lines */}
                <article className="text-ellipsis overflow-hidden text-slate-600 text-base flex items-end ">
                    {removeMarkdown(content.substring(0, 1000) + "....")}
                </article>
            </Link></div>

            {/* footer */}
            <div className="flex flex-row justify-between items-center">
                {/* icons */}
                <div className="flex items-center">
                    {tags.map((tag) => {
                        return (
                            <GenBadge name={tag} />
                        )
                    })}
                    <div className="text-sm text-slate-500">{`${getReadTime(content)} min read`}</div>
                </div>

                <Tooltip message={"Bookmark"}>
                <Bookmark blogId={id} bookMark={bookMark || false} />
                </Tooltip>

            </div>

        </div>
    )
}

export default BlogCard



