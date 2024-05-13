import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

// type tagsProps ={
//     id:string,
//     name:string
// }
export const useUserTags = (userId: string) => {
    const [userTagsLoading, setLoading] = useState(true)
    const [userTags, setUserTags] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/tag/${userId}`, {
                    headers: {
                        'Authorization': `bearer ${localStorage.getItem("jwt")}`
                    }
                })
                console.log(response.data)
                // setUserTags(response.data.tags);
                const x= response.data.tags.map((tag:{name:string})=>{return tag.name})
                setUserTags(x);
                setLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);


    return { userTagsLoading, userTags }
}