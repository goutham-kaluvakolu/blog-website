import { Link } from "react-router-dom"
import Tooltip from "./Tooltip"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

type SecondaryNav = {
    tags: string[],
    activeTag: string,
    handleActiveTagChange: (tag: string) => void,
    setUserTags: (tags: string[]) => void

}

const SecondaryNav = ({ tags, activeTag, handleActiveTagChange, setUserTags }: SecondaryNav) => {
    const [editActive, setEditActive] = useState(false)
    const handleSecNavChange = (tag: string) => {
        const finalTags = tags.filter(t => t !== tag)
        axios.post(`${BACKEND_URL}/api/v1/tag/user`, {
            tags: finalTags
        },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }
    
    ).then((res) => {
        console.log(res.data.tags);
        setUserTags( res.data.tags)
    })
    }
    return (
        <div className="flex space-x-6 overflow-x-auto scrollbar-hidepl-8 pr-8 items-center p-4 text-lg">
            {tags.length != 0 &&
            (
               <div className="text-slate-500 text-2xl mr-5 cursor-pointer hover:text-black"
                onClick={() => setEditActive(!editActive)}>
                <Tooltip message={"Edit your Feed"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </Tooltip>
            </div>
            ) }

            {
                (editActive || tags.length == 0 ) && (
                    <Link to="/profile" className="text-slate-500 text-2xl mr-5 cursor-pointer hover:text-black">
                        {/* plus icon */}
                            <Tooltip message={"Add new topics to your Feed"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-orange">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                    </svg>
                    </Tooltip>
                    </Link>
                
                )
            }

        

            <div className={`text-slate-500 ${activeTag == "Foryou" && "border-t-0 border-l-0 border-r-0 border-b-2 font-bold border-slate-800 text-black p-2"} 
            cursor-pointer border-2 p-2 hover:text-black`} onClick={() => handleActiveTagChange("Foryou")}>
                Foryou
            </div>
            {
                tags.map((tag: string) => {
                    return (
                        <div className={`relative ${editActive && "pt-3 pr-3"}`}>
                            <div className={`${activeTag == tag && "border-t-0 border-l-0 border-r-0 border-b-2  font-bold border-black text-black p-2"} 
                            cursor-pointer text-slate-500 border-2 p-2 border-gray-300 hover:text-black border-2 shadoweff`} onClick={() => handleActiveTagChange(tag)}>
                                {tag}
                                {
                                    editActive && (
                                        <div className="absolute top-0 right-0 text-red-500"
                                        onClick={() => handleSecNavChange(tag)}>
                                        
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-orange">
                                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    )
                                }

                            </div>
                        </div>

                    )
                })
            }</div>
    )
}

export default SecondaryNav