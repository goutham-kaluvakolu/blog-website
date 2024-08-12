import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useCheckFollowing = (authorId: string) => {
    // const [followersLoading,setLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}api/v1/default/checkfollowing/${localStorage.getItem("userId")}/${authorId}`);
                console.log(response.data)
                setIsFollowing(response.data.isFollowing);
                // setLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

// console.log("***",followerCounts)
  return {isFollowing,setIsFollowing}
}
