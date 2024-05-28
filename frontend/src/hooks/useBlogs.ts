import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
type blogProps= {
    "authorName": string,
    "content": string,
    "title": string
    "id":string,
    "authorId":string,
    "updatedAt":string,
    "tagNames":string[]
}

export const useBlogs = () => {
    const [loading,setLoading] = useState(true)
    const [blogs, setBlogs] = useState<blogProps[]>([])
    const navigate=useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/default/bulk`);
                console.log(response.data)
                setBlogs(response.data);
                setLoading(false);

            } catch (error) {
                console.log(error);
                navigate("/sigin")
            }
        }

        fetchData();
    }, []);


  return {loading,blogs}
}