import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"

const Bookmark = ({ blogId,bookMark }: { blogId: string ,bookMark:boolean}) => {
    const [fill, setFill] = useState(bookMark)
    return (
        <div onClick={() => {
            setFill(prev => !prev)
            axios.post(`${BACKEND_URL}/api/v1/blog/bookmark`, {
                userId: localStorage.getItem("userId"),
                blogId: blogId,
                bookMark:!fill
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    }
                }
            )
        }}><svg className={`h-5 w-5 text-zinc-400 ${fill ? "fill-orange" : "fill-none"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg></div>

    )
}

export default Bookmark