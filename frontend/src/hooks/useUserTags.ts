import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

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
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
        fetchData();
    }, []);


    return { userTagsLoading, userTags }
}