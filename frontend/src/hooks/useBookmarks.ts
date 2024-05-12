import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const useBookmarks = () => {
    const [loading,setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const navigate=useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bookmarks`, {

                    headers: {
                        'Authorization': `bearer ${localStorage.getItem("jwt")}`
                    }
                });
                console.log(response.data)
                setBlogs(response.data);
                setLoading(false);

            } catch (error) {
                console.log(error);
                // navigate("/sigin")
            }
        }

        fetchData();
    }, []);


  return {loading,blogs}
}