// import { useEffect, useState } from "react"
// import Blogskeleton from "../components/Blogskeleton"
// import { useTags } from "../hooks/useTags"
// import { useUserTags } from "../hooks/useUserTags"
// import Badge from "../components/Badge"
// import { BACKEND_URL } from "../config"
// import axios from "axios"
// import { useNavigate } from "react-router-dom";



// const Profile = () => {
//   const navigate = useNavigate();
//   const { loading, tags } = useTags()
//   const { userTagsLoading, userTags } = useUserTags(localStorage.getItem("userId") || 'admin')
//   const [newUserTags, setNewUserTags] = useState<string[]>([...userTags])
//   useEffect(() => {
//     setNewUserTags([...newUserTags])
//   }, [])

//   function handleAddTag(tagName: string) {
//     if (!newUserTags.includes(tagName)) {
//       setNewUserTags(prev => [...prev, tagName]);
//       console.log("handleAddTag", newUserTags)
//     }
//   }



//   const handleRemoveBadge = (tagName: string) => {
//     setNewUserTags(prevState => prevState.filter(tag => tag !== tagName)); // Remove the tag from selectedTags state
//     console.log("handleRemoveBadge", newUserTags)
//   };


//   const handleNewTagsSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     axios.post(`${BACKEND_URL}/api/v1/tag/user`,
//       {
//         tags: newUserTags
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem("jwt")}`
//         }
//       }
//     ).then((res) => {

//       navigate(`/profile`)
//       console.log(res)
//     })
//       .catch((error) => console.error('Error publishing blog:', error));
//   }



//   return (
//     <div className="m-6">
//       {userTagsLoading ? (<div className="w-full flex flex-col items-center"><Blogskeleton /><Blogskeleton /><Blogskeleton /><Blogskeleton /></div>) :
//         (
//           <div className="border-b-2 pb-6">Your Tags <button onClick={(e) => handleNewTagsSubmit(e)}>Submit</button>
//             {userTags.map((tag) =>
//               <Badge name={tag} handleRemoveBadge={() => handleRemoveBadge(tag)} />

//             )}
//             {newUserTags.map((tag) =>
//               <Badge name={tag} handleRemoveBadge={() => handleRemoveBadge(tag)} />

//             )}
//           </div>
//         )
//       }

//       {loading && (<div className="w-full flex flex-col items-center"><Blogskeleton /><Blogskeleton /><Blogskeleton /><Blogskeleton /></div>)}
//       {tags.map((tag) => (
//         <div key={tag} onClick={() => { handleAddTag(tag) }}>{tag}</div> // Use 'tag.name' to access the tag name
//       ))}
//     </div>
//   )
// }

// export default Profile;

import { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTags } from "../hooks/useTags";
import { useUserTags } from "../hooks/useUserTags";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, tags } = useTags();
  const { userTagsLoading, userTags } = useUserTags(localStorage.getItem("userId") || 'admin');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!userTagsLoading) {
      setSelectedTags([...userTags]);
    }
  }, [userTagsLoading, userTags]);

  const handleAddTag = (tagName:string) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags((prev) => [...prev, tagName]);
    }
  };

  const handleRemoveTag = (tagName:string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagName));
  };

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
        navigate("/profile");
        console.log(res);
      })
      .catch((error) => console.error("Error updating user tags:", error));
  };

  return (
    <div className="m-6">
      {userTagsLoading ? (
        <div className="w-full flex flex-col items-center">
          {/* Loading Skeletons */}
        </div>
      ) : (
        <div>
          <div className="border-b-2 pb-6">
            Your Tags{" "}
            <button onClick={handleTagsSubmit}>Submit</button>
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                name={tag}
                handleRemoveBadge={() => handleRemoveTag(tag)}
              />
            ))}
          </div>
          {loading ? (
            <div className="w-full flex flex-col items-center">
              {/* Loading Skeletons */}
            </div>
          ) : (
            tags.map((tag) => (
              <div key={tag} onClick={() => handleAddTag(tag)}>
                {tag}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
