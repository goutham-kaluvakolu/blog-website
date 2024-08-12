import { useRecoilValue } from "recoil";
import Tags from "../components/Tags"
import { blogStateAtom } from "../atoms";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const Summary = () => {
  const navigate = useNavigate();
  const blogInfo = useRecoilValue(blogStateAtom);
  const handlePublish = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    axios.post(`${BACKEND_URL}/api/v1/blog`,
    {
     ...blogInfo
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }
    ).then((res) => {
      
  navigate(`/blog/${res.data.blog.id}`)
  console.log(res)
    })
  .catch((error) => console.error('Error publishing blog:', error));
  }

  return (
    <><div className="ml-5 mr-5">
      <div className="flex flex-row-reverse">
     
      <button className="bg-orange font-medium m-2 px-3 py-2 rounded"
          onClick={handlePublish}
        >publish</button>
         <button className="bg-orange font-medium m-2 px-3 py-2 rounded"
          onClick={() => navigate('/writeblog')}
        >Back</button>
      </div>
       
    <Tags/>
    <div className="text-5xl font-bold mb-10 mt-10">{blogInfo.title}</div>
    <div>
    {/* {blogInfo.content.split('\n').map((line, index) => (
          <div key={index}>{line === '' ? <br /> : line}</div>
        ))} */}
        <ReactMarkdown children={blogInfo.content} remarkPlugins={[remarkGfm]} />
    
    </div>   

  </div></>
  )
}

export default Summary