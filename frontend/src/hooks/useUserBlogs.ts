import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


type blogProps = {
    createdAt: string,
    updatedAt:string,
    id:string,
    authorId:string,
    authorName:string,
    content:string,
    published:boolean,
    title:string,
    likes:number,
    shareCount:number,
    tags:string[]
}
export const useUserBlogs = (authorId: string) => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<blogProps[]>([])
    const [authorName, setAuthorName] = useState("UnKnown")


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/user/${authorId}`, {
                    headers: {
                        'Authorization': `bearer ${localStorage.getItem("jwt")}`
                    }
                })
                console.log(response.data)
                setBlogs(response.data.blogs);
                setAuthorName(response.data.blogs[0].authorName)
                setLoading(false);

            } catch (error) {
                console.log(error); 
            }
        }

        fetchData();
    }, []);


    return { loading, blogs ,authorName }
}