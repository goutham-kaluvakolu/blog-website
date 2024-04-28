import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

type blogProps = {
    id:string,
    authorId:string,
    authorName:string,
    content:string,
    published:boolean,
    title:string
}
export const useBlog = (blogId: string) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<blogProps>({id:"unknown",
        authorId:"notfound",
        authorName:"NA",
        content:"NA",
        published:false,
        title:"NA"})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                    headers: {
                        'Authorization': `bearer ${localStorage.getItem("jwt")}`
                    }
                })
                console.log(response.data)
                setBlog(response.data.blog);
                setLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);


    return { loading, blog }
}