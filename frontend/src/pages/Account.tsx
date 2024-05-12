import { Link } from "react-router-dom"
import Avatar from "../components/Avatar"

const Account = () => {
  return (
    <div className="m-10">
      <div className="flex items-center mb-10"><Avatar authorName={localStorage.getItem("userName") || "unknown"} hieght="h-12" width='w-12' /><div className="text-2xl ml-2">{localStorage.getItem("userName")}</div></div>
      <div className="flex flex-col m-5">
        <Link to={"/profile"} className="text-xl pb-2 border-b-2 mb-6 hover:border-rose-500 hover:text-rose-500">profile</Link>
        <Link to={"/library"} className="text-xl pb-2 border-b-2 mb-6 hover:border-rose-500 hover:text-rose-500">bookmarks</Link>
        {/* <div >signout</div> */}
      </div>

    </div>
  )
}

export default Account