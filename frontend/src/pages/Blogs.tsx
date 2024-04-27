import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import BlogCard from "../components/BlogCard";
const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            //   setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        'Authorization': `bearer ${localStorage.getItem("jwt")}`
                    }
                });
                console.log(response.data.blogs)
                setBlogs(response.data.blogs);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);
    return (
        <div>Blogs
            {blogs.map((blog: {
                "authorId": string,
                "content": string,
                "title": string
            }) => <BlogCard authorId={blog.authorId} content={blog.content} title={blog.title} />)}
        </div>

    )
}

export default Blogs