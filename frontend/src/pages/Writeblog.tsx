import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom";


const Writeblog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(()=>{
    if (localStorage.getItem("jwt")){
      
    }
    else{
      navigate("/signin")
    }
  },[])

  const handlePublish = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.post(`${BACKEND_URL}/api/v1/blog`,
    {
      title,
      content
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }
    ).then((res) => {
  navigate(`/blog/${res.data.id}`)
  console.log(res)
    })
  .catch((error) => console.error('Error publishing blog:', error));
  }

  return (
    <form>
      <div className="w-full p-5">
        {/* reusable badge */}
        <div className="flex flex-row-reverse mb-4">
          <button className="bg-green-100 text-white text-xs font-medium me-2 px-3 py-2 rounded dark:bg-green-900 dark:text-white"
            onClick={handlePublish}
          >publish</button>
        </div>
        <input type="text" className="w-full border-b-2 p-4 text-5xl focus:border-transparent focus:outline-none " placeholder="Title"
          onChange={(e) => { setTitle(e.target.value) }} />
        <textarea className="w-full p-4 text-2xl focus:border-transparent focus:outline-none " placeholder="Start writing ..."
          onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
    </form>

  )
}

export default Writeblog