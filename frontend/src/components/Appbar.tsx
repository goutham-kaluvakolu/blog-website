import { Link } from "react-router-dom"
import Avatar from "./Avatar"
// import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { appBarVisibility } from "../atoms";
import axios from "axios";
import { BACKEND_URL } from "../config";




const Appbar = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useRecoilState(appBarVisibility)

    return (
        <div className="flex justify-between p-2 border-b-2 items-center">
            <Link to="/blogs"><div className="font-bold ">
                {/* <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="60" fill="#2c3e50"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#ecf0f1">lofi blogs</text>
</svg> */}

                <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Brush Script MT, cursive" font-size="40" fill="#2c3e50">lofi blogs</text>
                </svg>


                {/* <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="60" fill="#2c3e50"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Brush Script MT, cursive" font-size="32" fill="#ecf0f1">lofi blogs</text>
</svg> */}


            </div></Link>
            <div className="flex  flex-row-reverse  w-1/2 md:w-1/3 lg:w-1/5 justify-between">
                {
                    visible && (
                        <div className="w-full flex justify-between w-full text-lg text-slate-500 items-center">
                            <Link to="/writeblog" ><span className="text-lg font-medium">Write</span></Link>
                            <div onClick={() => {
                                localStorage.removeItem('jwt');
                                localStorage.removeItem('userName');
                                localStorage.removeItem('userId');
                                setVisible(false)
                                navigate("/signin");

                            }}
                                className="text-lg font-medium cursor-pointer"
                            >
                                Logout

                            </div>

                            <Link to={`/Account/${localStorage.getItem('userId')}`} className="mr-2 hovereffect"  >
                                <Avatar authorName={localStorage.getItem('userName') || "unknown"} hieght="h-8" />
                                <div className="dropdown m-1 p-2 rounded-lg border-2 border-slate-300 bg-white right-1 text-lg" >
                                    <ul>
                                        <li className="hover:bg-orange p-2 rounded-lg">dashboard</li>
                                        <li className="hover:bg-orange p-2 rounded-lg">profile</li>
                                        <li className="hover:bg-orange p-2 rounded-lg">bookmaks</li>
                                    </ul>
                                </div>
                            </Link>

                            <div>


                            </div>


                        </div>


                    )
                }
                {!visible && (

                    <div className="w-full flex flex-row-reverse text-slate-500 text-lg items-center justify-between" >
                        <div className="m-2 cursor-pointer font-medium border-2 p-2 shadoweff items-center"
                        onClick={() =>{
                            axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                "email": "vaper@gmail.com",
                                "password": "Havefun1!"
                            }).then((res) => {
                                localStorage.setItem("jwt", res.data.jwt)
                                localStorage.setItem("userId", res.data.id)
                                localStorage.setItem("userName", res.data.name)
                                navigate("/blogs");
                                setVisible(prev => !prev)
                            })
                        } }
                        >
                            Demo User </div>

                        <div onClick={() => {
                            // setVisible(prev => !prev)
                            navigate("/signin");
                        }}
                            className="cursor-pointer font-medium m-2 "
                        >
                            Log in
                        </div>
                        <div className="m-2 cursor-pointer font-medium">
                            About
                        </div>

                    </div>










                )}

            </div>
        </div>
    )
}

export default Appbar

