import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import Tooltip from "./Tooltip"

type likeProps = {
    count: number,
    blogId: string
}
const Likes = ({ count, blogId }: likeProps) => {
    const maxCount = count + 1
    const [likes, setLikes] = useState<number>(count)
    const [likeActive, setLikeActive] = useState<boolean>(false)
    function handleLikes() {
        if (likes < maxCount) {
            setLikes(prev => prev + 1)
            setLikeActive(prev => !prev)
        }
        else{
            setLikes(prev => prev - 1)
            setLikeActive(prev => !prev)
        }
        axios.put(`${BACKEND_URL}/api/v1/blog/like`, {
                blogId: blogId,
                likes: likes < maxCount ? likes + 1 : likes - 1
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    }
                }).then(() => {
                    console.log("liked")
                }).catch((e) => { console.log(e) })
    }
    return (
        <div className="flex mr-5" onClick={handleLikes}>
            <Tooltip message="Likes">
                <Like likeActive={likeActive}/> 
            </Tooltip>
            {likes}
        </div>
    )
}

export default Likes

const Like = ({ likeActive }: { likeActive: boolean }) => {
    return (
        <div>
            <svg className={`${likeActive ? "fill-orange": "fill-none"} mr-2 h-5 w-5 text-gray-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
        </div>
    )
}



