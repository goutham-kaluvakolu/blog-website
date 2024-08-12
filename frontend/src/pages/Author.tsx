import { useParams } from "react-router-dom"
import Avatar from "../components/Avatar"
import { useUserBlogs } from "../hooks/useUserBlogs"
import Blogskeleton from "../components/Blogskeleton";
import BlogCard from "../components/BlogCard";
import { useGetFollowers } from "../hooks/useGetFollowers";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useCheckFollowing } from "../hooks/useCheckFollowing";

const Author = () => {
    const { id } = useParams();
    const { loading, blogs, authorName } = useUserBlogs(id || "unknown")
    const { followerCounts, setFollowerCounts } = useGetFollowers(id || "unknown")
    const { isFollowing, setIsFollowing } = useCheckFollowing(id || "unknown")
    console.log(blogs, authorName, followerCounts)
    const postFollower = () => {
        if (!isFollowing) {
            axios.post(`${BACKEND_URL}/api/v1/default/follow/${id}`, {
                followerId: localStorage.getItem("userId")
            }).then((res) => {
                setFollowerCounts(followerCounts + 1)
            })
                .catch((err) => {
                    console.log(err)
                })
            setIsFollowing(true)
        }
        else {
            axios.post(`${BACKEND_URL}/api/v1/default/unfollow/${id}`, {
                followerId: localStorage.getItem("userId")
            })
                .then((res) => {
                    setFollowerCounts(followerCounts - 1)
                })
                .catch((err) => {
                    console.log(err)
                })
            setIsFollowing(false)

        }


    }
    if (loading) {
        return (
            <div>
                <Blogskeleton />
                <Blogskeleton />
                <Blogskeleton />
            </div>
        )
    }
    return (
        <div className="flex flex-row-reverse justify-center">
            <div className="border-l-2 border-slate-300" >
            <div className="sticky  top-0  md:p-5 flex flex-col justify-between">
                        <div className="flex ">
                            <Avatar authorName={authorName} width="w-20" height="h-20" />
                        </div>
                        <div className="m-4">
                            <div className="text-3xl">{authorName}</div>
                            <div className="flex"><span className="flex text-xl font-bold mr-2">{followerCounts}</span><span className="text-xl font-normal"> followers</span></div>
                        </div>
                        <button className=" bg-transparent bg-orange hover:bg-teal-500 text-teal-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded hover:bg-white"
                            onClick={postFollower}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}

                        </button>
                    </div>
            </div>
          
            <div className="w-2/3">
                    <div className="hidden font-semibold text-5xl md:block">{authorName}</div>

                    {blogs.length == 0 && (<div className="m-10 text-center">Start writing blogs, check out the nav bar</div>)}
                    {blogs.map((blog) => {
                        return <BlogCard id={blog.id} authorName={authorName} content={blog.content} title={blog.title} authorId={blog.authorId} blogDate={blog.updatedAt} tags={blog.tags} />;
                    })}
                </div>
        </div>


    )
}

export default Author

