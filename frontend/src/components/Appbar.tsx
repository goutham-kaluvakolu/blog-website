import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";




const Appbar = () => {
    const [visible, setVisible] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            setVisible(true)
        }
    }, [])

    return (
        <div className="flex justify-between p-4 border-b-2 mb-4">
            <Link to="/blogs"><div>Medium</div></Link>
            <div className="flex justify-between">
                {visible && <Link to="/writeblog" >Write</Link>}
                <Link to={`/Account/${localStorage.getItem('userId')}`} className="mr-2"><Avatar authorName={localStorage.getItem('userName')||"unknown"} /></Link>
                <div onClick={() => {
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userId');
                    navigate("/signin");
                }}>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Appbar

