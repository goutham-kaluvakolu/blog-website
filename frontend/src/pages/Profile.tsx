import { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTags } from "../hooks/useTags";
import { useUserTags } from "../hooks/useUserTags";
import Blogskeleton from "../components/Blogskeleton";
import Toast from "../components/Toast";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, tags } = useTags();
  const { userTagsLoading, userTags } = useUserTags(localStorage.getItem("userId") || 'admin');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [displayError, setDisplayError] = useState(<></>)


  useEffect(() => {
    if (!userTagsLoading) {
      setSelectedTags([...userTags]);
    }
  }, [userTagsLoading, userTags]);

  const handleAddTag = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags((prev) => [...prev, tagName]);
    }
  };

  const handleRemoveTag = (tagName: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagName));
  };

  function handleClose(){
    setDisplayError(<></>)
}

  const handleTagsSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    axios
      .post(
        `${BACKEND_URL}/api/v1/tag/user`,
        {
          tags: selectedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        
        let message=""
        console.log(res.status);
        if(res.status==200){
          message="sucess"
        }
        setDisplayError(<Toast message={message} type="" handleClose={handleClose}/>)
        setTimeout(() => {
          navigate("/blogs");
        }, 10000)
      })
      .catch((error) => {
        console.error("Error updating user tags:", error)
        setDisplayError(<Toast message={"server error try again later"} type="" handleClose={handleClose}/>)
      })
  };

  return (
    <div>
      {displayError}
      <div className="m-6">
        {userTagsLoading ? (
          <div className="w-full flex flex-col items-center">
            {/* Loading Skeletons */}
            <Blogskeleton />s
          </div>
        ) : (
          <div>
            <div className="border-b-2">
              <div className="flex justify-between">
                <div className="text-black text-bold text-4xl">
                  Your Tags
                </div>
                <button className="bg-green-500 p-2" onClick={handleTagsSubmit}>Submit</button>
              </div>
              {selectedTags.length == 0 && (<div className="text-slate-500 text-2xl m-10 mt-15 text-center">
                Select some tags so we know you better
              </div>)}
              <div className="m-10 mt-15">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    name={tag}
                    handleRemoveBadge={() => handleRemoveTag(tag)}
                  />
                ))}
              </div>
            </div>
            <div className="">
              <div className="text-bold text-xl m-8 mb-15"> Some popular picks for you</div>
              <div className="mt-5">
                {loading ? (
                  <div className="w-full flex flex-col items-center">
                    <Blogskeleton />
                  </div>
                ) : (
                  tags.map((tag) => (
                    <div className="cursor-pointer text-lg border-b-2 p-2 m-2" key={tag} onClick={() => handleAddTag(tag)}>
                      {tag}
                    </div>
                  ))
                )}
              </div>
            </div>


          </div>
        )}
      </div>
    </div>

  );
};

export default Profile;
