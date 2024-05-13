import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
// type tagsProps ={
//     id:string,
//     name:string
// }

export const useTags = () => {
    const [loading,setLoading] = useState(true)
    const [tags, setTags] = useState<string[]>([])
    const navigate=useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/tag/all`, {
                    headers: {
                        'Authorization': `bearer ${localStorage.getItem("jwt")}`
                    }
                });
                console.log(response.data)
                // setTags(response.data.tags);
                const x= response.data.tags.map((tag:{name:string})=>{return tag.name})
                setTags(x);
                setLoading(false);

            } catch (error) {
                console.log(error);
                navigate("/sigin")
            }
        }

        fetchData();
    }, []);


  return {loading,tags}
}