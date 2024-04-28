import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const Appbar = () => {
    return (
        <div className="flex justify-between p-4 border-b-2 mb-4">
            <div>Medium</div>
            <div className="flex justify-between">
            <Link to="/writeblog" >Write</Link>
            <Avatar authorName="trash hero" />
            </div>
        </div>
    )
}

export default Appbar