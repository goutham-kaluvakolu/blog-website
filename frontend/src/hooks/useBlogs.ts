import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
    const [loading,setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        'Authorization': `bearer ${localStorage.getItem("jwt")}`
                    }
                });
                console.log(response.data)
                setBlogs(response.data);
                setLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);


  return {loading,blogs}
}