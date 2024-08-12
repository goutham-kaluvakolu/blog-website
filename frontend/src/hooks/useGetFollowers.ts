import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useGetFollowers = (authorId: string) => {
    const [followersLoading,setLoading] = useState(true)
    const [followerCounts, setFollowerCounts] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/default/followers/${authorId}`);
                console.log(response.data)
                setFollowerCounts(response.data.followersCount);
                setLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

console.log("***",followerCounts)
  return {followersLoading,followerCounts,setFollowerCounts}
}