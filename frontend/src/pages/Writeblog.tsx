import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { blogStateAtom } from "../atoms";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const Writeblog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [blogInfo, setBlogInfo] = useRecoilState(blogStateAtom);


  useEffect(() => {
    if (localStorage.getItem("jwt")) {

    }
    else {
      navigate("/signin")
    }
  }, [])

  const handlePublish = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setBlogInfo({ ...blogInfo, title: title, content: content })
    navigate(`/summary`)

  }

  console.log("rerender")

  return (

    <form>

      <div className="w-full p-5">
        {/* reusable badge */}
        <div className="flex flex-row-reverse mb-4">
          <button className="bg-green-100 text-white text-xs font-medium me-2 px-3 py-2 rounded dark:bg-green-900 dark:text-white"
            onClick={handlePublish}
          >Next</button>
        </div>
        {/* <Tags/> */}
        <input type="text" className="w-full border-b-2 p-4 text-5xl focus:border-transparent focus:outline-none " placeholder="Title"
          onChange={(e) => { setTitle(e.target.value) }} />
        <div className="flex">
          <textarea className="h-screen resize-none w-1/2 p-4  focus:border-transparent focus:outline-none " placeholder="Start writing ..."
            onChange={(e) => setContent(e.target.value)} value={content} ></textarea>
          <div className="w-1/2">
          <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
          </div>
        </div>

      </div>
    </form>

  )
}

export default Writeblog