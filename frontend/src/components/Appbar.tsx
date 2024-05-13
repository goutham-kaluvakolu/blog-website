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
        <div className="flex justify-between p-4 border-b-2 ">
            <Link to="/blogs"><div className="font-bold w-2/3">Medium</div></Link>
            <div className="flex justify-between w-1/3 md:w-1/4 lg:w-1/6">
                {visible && <Link to="/writeblog" >Write</Link>}
                <div onClick={() => {
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userId');
                    navigate("/signin");
                }}>
                    Logout

                </div>
                <Link to={`/Account/${localStorage.getItem('userId')}`} className="mr-2"><Avatar authorName={localStorage.getItem('userName')||"unknown"} /></Link>

            </div>
        </div>
    )
}

export default Appbar

