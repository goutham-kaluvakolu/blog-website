import { Link } from "react-router-dom"
import Avatar from "./Avatar"
// import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { appBarVisibility } from "../atoms";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";




const Appbar = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useRecoilState(appBarVisibility)
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)

    return (
        <div className="flex justify-between p-2 border-b-2 items-center relative">
            <Link to="/blogs">
                <div className="font-bold">
                    <Logo />
                </div>
            </Link>
            <div className="md:w-1/3 lg:w-1/4">
                <div className="md:hidden" onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
                    {!isHamburgerOpen ? <Hamburger /> : <div className="text-2xl cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-orange">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>

                    </div>}
                </div>
                <div className={`md:block ${isHamburgerOpen ? `block ` : 'hidden'} absolute right-0 top-full w-1/3 md:w-full h-screen bg-opacity-50 backdrop-blur-md md:h-auto md:w-auto md:top-0 md:p-2
                mt-2 bg-white border rounded shadow-lg md:relative md:mt-0 md:border-0 md:shadow-none`}>
                    <NavContent visible={visible} setVisible={setVisible} navigate={navigate} />
                </div>
            </div>
        </div>
    )
}

export default Appbar

const Hamburger = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-orange">
            <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>

    )

}

const Logo = () => {

    return (
        <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Brush Script MT, cursive" font-size="40" fill="#2c3e50">lofi blogs</text>
        </svg>
    )
}

const NavContent = ({ visible, setVisible, navigate }: { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>, navigate: any }) => {
    return (
        <div className="flex flex-col items-center m-4 justify-between">
            <div className="flex w-full flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-2 md:p-0 justify-center md:justify-between ">
                {visible ? (
                    <>
                        <Link to="/writeblog"><span className="text-lg hover:text-orange opacity-100 ">Write</span></Link>
                        <div
                            onClick={() => {
                                localStorage.removeItem('jwt');
                                localStorage.removeItem('userName');
                                localStorage.removeItem('userId');
                                setVisible(false);
                                navigate("/signin");
                            }}
                            className="text-lg font-medium cursor-pointer hover:text-orange opacity-100"
                        >
                            Logout
                        </div>
                        <Link to={`/Account/${localStorage.getItem('userId')}`} className="mr-2 hovereffect">
                            <Avatar authorName={localStorage.getItem('userName') || "unknown"} height="h-8" />
                        </Link>
                    </>
                ) : (
                    <>
                        <div
                            className="cursor-pointer font-medium border-2 p-2 shadoweff"
                            onClick={() => {
                                axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                    "email": "vaper@gmail.com",
                                    "password": "Havefun1!"
                                }).then((res) => {
                                    localStorage.setItem("jwt", res.data.jwt);
                                    localStorage.setItem("userId", res.data.id);
                                    localStorage.setItem("userName", res.data.name);
                                    navigate("/blogs");
                                    setVisible(true);
                                });
                            }}
                        >
                            Demo User
                        </div>
                        <div
                            onClick={() => navigate("/signin")}
                            className="cursor-pointer font-medium hover:text-orange"
                        >
                            Log in
                        </div>
                        <div className="cursor-pointer font-medium hover:text-orange">
                            About
                        </div>
                    </>
                )}
            </div>
        </div>

    );
};