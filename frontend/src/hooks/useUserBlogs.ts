import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


export const useUserBlogs = (authorId: string) => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([{id:"unknown",
    authorId:"notfound",
    authorName:"NA",
    content:"NA",
    published:false,
    title:"NA",
    updatedAt:"2024-05-11T21:39:36.736Z"
}])
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
                setAuthorName(response.data.authorName.name)
                setLoading(false);

            } catch (error) {
                console.log(error); 
            }
        }

        fetchData();
    }, []);


    return { loading, blogs ,authorName }
}