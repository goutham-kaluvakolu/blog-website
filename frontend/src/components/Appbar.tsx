import { Link } from "react-router-dom"
import Avatar from "./Avatar"
// import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { appBarVisibility } from "../atoms";




const Appbar = () => {
    const navigate = useNavigate()
    const [visible,setVisible] = useRecoilState(appBarVisibility)

    return (
        <div className="flex justify-between p-4 border-b-2 ">
            <Link to="/blogs"><div className="font-bold w-2/3">Medium</div></Link>
            <div className="flex  flex-row-reverse w-1/2 md:w-1/4 lg:w-1/6">
                {
                    visible && (
                        <div className="flex justify-between w-full text-sm text-slate-500">
                            <Link to="/writeblog" >Write</Link>
                            <div onClick={() => {
                                localStorage.removeItem('jwt');
                                localStorage.removeItem('userName');
                                localStorage.removeItem('userId');
                                setVisible(false)
                                navigate("/signin");
                            }}>
                                Logout

                            </div>
                            <Link to={`/Account/${localStorage.getItem('userId')}`} className="mr-2"><Avatar authorName={localStorage.getItem('userName') || "unknown"} /></Link>
                        </div>
                    )
                }
                {!visible&&(
                    <div onClick={() => {
                        // setVisible(prev => !prev)
                        navigate("/signin");
                    }}>
                        Login
                    </div>
                )}

            </div>
        </div>
    )
}

export default Appbar

