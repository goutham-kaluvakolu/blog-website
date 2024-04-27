type blogcardProps={
    "authorId":string,
    "content":string,
    "title":string
}
const BlogCard = ({authorId,content,title}:blogcardProps) => {
    return (
        <div className="border-b-2 mb-2 w-2/3 h-28 ">
            {/* header */}
            <div>
                {/* name */}
                <span className="mr-2">{authorId}</span>
                {/* dot */}
                <span className="mr-2 pb-2">.</span>
                {/* date */}
                <span className="text-stone-600">3 dec 2224</span>
            </div>

            {/* title */}
            <div className="font-bold text-3xl">
            {title}
            </div>
            {/* few lines */}
            <article className="text-ellipsis overflow-hidden">
                {content}
            </article>
            {/* footer */}
            <div>
                {/* icons */}
            </div>
        </div>
    )
}

export default BlogCard