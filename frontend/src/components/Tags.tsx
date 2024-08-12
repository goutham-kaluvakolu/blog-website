import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import Badge from "./Badge";
import { useRecoilState } from "recoil";
import { blogStateAtom } from "../atoms";



type tag = {
  name: string
}


const premium = false

const Tags = () => {
  const [tags, setTags] = useState<tag[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [blogInfo, setBlogInfo] = useRecoilState(blogStateAtom);

useEffect(()=>{
  const tag=""
  axios.get(`${BACKEND_URL}/api/v1/tag/bulk`, {
    params: {tag }, // Send tag in the request body
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    }
  })
    .then((res) => {
      console.log(res);
      setTags(res.data.tags)

    })
    .catch((error) => console.error('Error publishing blog:', error));
},[]
)



  const createTag = (e: { target: { value: any; }; }) => {
    // e.preventDefault();
    const tag = e.target.value
    setNewTag(tag)
  }
  const handleBlogTags = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags(prevSelectedTags => [...prevSelectedTags, tagName]); // Update selectedTags with the new tag
  
      // setBlogInfo(prevBlogInfo => ({ ...prevBlogInfo, tags: [...prevSelectedTags, tagName] })); // Update blogInfo with the new tags
      setBlogInfo(prevBlogInfo => ({ ...prevBlogInfo, tags: [...selectedTags, tagName] }));

    }
    console.log("handleBlogTags",blogInfo)

  }
  const handleRemoveBadge = (tagName: string) => {
    setSelectedTags(prevState => prevState.filter(tag => tag !== tagName)); // Remove the tag from selectedTags state
    setBlogInfo(prevBlogInfo => ({ ...prevBlogInfo, tags: selectedTags.filter(tag => tag !== tagName) }));
    console.log("handleRemoveBadge",blogInfo)

  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    axios.get(`${BACKEND_URL}/api/v1/tag/create`, {
      params: { tag: newTag }, // Send tag in the request body
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error('Error publishing blog:', error));

  }

  const handleTags = (e: { target: { value: any; }; }) => {
    // e.preventDefault();
    const tag = e.target.value
    console.log(tag)
    axios.get(`${BACKEND_URL}/api/v1/tag/bulk`, {
      params: { tag }, // Send tag in the request body
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then((res) => {
        console.log(res);
        setTags(res.data.tags)

      })
      .catch((error) => console.error('Error publishing blog:', error));

  }

  return (
    <div>
      <div className="m-5">
      <div className="text-center text-xl opacity-50 m-10">{selectedTags.length==0&&"Add tags to your blog for more reach"}</div>
        {selectedTags.map((tagName: string) => (
          <Badge name={tagName} handleRemoveBadge={() => handleRemoveBadge(tagName)} />
        ))}
      </div>
      <input type="text" className="w-full border-b-2 p-4 text-2xl focus:border-transparent focus:outline-none " placeholder="Search for Tag"  onChange={handleTags}/>
      <div className="">
        <div className="">
          {tags.slice(0, 10).map((tag: { name: string }, index: number) => (
            <div className="cursor-pointer text-lg border-b-2 p-2 m-2 shadoweff" key={index} onClick={() => handleBlogTags(tag.name)}>{tag.name}</div> // Use 'tag.name' to access the tag name
          ))}
        </div>
      </div>
      {premium && <div>
        <input type="text" placeholder="create" onChange={createTag} />
        <button onClick={handleSubmit}>submit</button>
      </div>}

      
    </div>

  )
}

export default Tags



