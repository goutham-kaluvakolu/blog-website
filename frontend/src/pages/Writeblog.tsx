// import axios from "axios"
import { useEffect, useState } from "react"
// import { BACKEND_URL } from "../config"
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
  // const [showDropdown, setShowDropdown] = useState(false)
  // const [linkName, setLinkName] = useState("")
  // const [linkAddress, setLinkAddress] = useState("")





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


  // const handleLinkName = (e: { target: { value: SetStateAction<string>; }; }) => {
  //   setLinkName(e.target.value)

  // }
  // const handleLink = (e: { target: { value: SetStateAction<string>; }; }) => {
  //   setLinkAddress(e.target.value)
  // }
  // const handleLinkSubmit = (e: { preventDefault: () => void; }) => {
  //       e.preventDefault();
  //   const link = `<a href=${linkAddress} style="color:blue;text-align:center;>${linkName}</a>`
  //   setContent(prev => prev + link)
  // }

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
          <div className="bg-slate-300 text-white w-1/2">
          {/* <ReactMarkdown>## Headers</ReactMarkdown> */}
          <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
          </div>
          {/* {showDropdown && (
            <div>
              <ul>
                <li>link <input type="text" placeholder="paste your link" onChange={(e) => handleLink(e)} /> <input type="text" placeholder="link name" onChange={(e) => handleLinkName(e)} /> <button onClick={handleLinkSubmit}>submit</button></li>
              </ul>
            </div>
          )} */}
        </div>

      </div>
    </form>

  )
}

export default Writeblog