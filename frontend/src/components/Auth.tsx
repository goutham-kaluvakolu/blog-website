import { Link } from "react-router-dom"
import { SigninInput } from '@goutham4331/blog-website-commons'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: string }) => {

    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    });

    const signup = [{ label: "username", placeholder: "username", req: false }, { label: "email", placeholder: "you@example.com", req: true }, { label: "password", placeholder: "password", req: true }]
    const signin = [{ label: "email", placeholder: "you@example.com", req: true }, { label: "password", placeholder: "password", req: true }]

    let fields = type == "signin" ? signin : signup

    const navigate = useNavigate();

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        console.log("handle chnage")
        const { name, value } = e.target;
        setPostInputs(prev => ({ ...prev, [name]: value }))
    }
    const url=type=="signin"?`${BACKEND_URL}/api/v1/user/signin`:`${BACKEND_URL}/api/v1/user/signup`
    async function handleSubmit(){
        console.log(postInputs)
        console.log("handle submit")

        try{
            const response= await axios.post(url,postInputs)
            console.log("response",response)
            localStorage.setItem("jwt",response.data.jwt)
            navigate("/blogs")
            console.log(localStorage.getItem("jwt"))
        }
        catch(e){
            console.log("error",e)
        }
        
    }

    return (

        <div className="flex justify-center">

            <form className="min-h-screen flex flex-col justify-center w-2/3">
                {fields.map((field) => <Box label={field.label} placeholder={field.placeholder} req={field.req} handleChange={handleChange} />)}
                <div className="flex items-center justify-between mt-4 w-full mb-4" >
                    <button className="w-full bg-red-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        onClick={handleSubmit}>
                        {type=="signin"?"Login":"Sign up"}
                    </button>
                </div>
                {type == "signin" && <Link to={"/"} className="inline-block mb-2 align-baseline font-bold text-sm text-red-500 hover:opacity-70">
                    Forgot Password?
                </Link>}
                {type == "signup" && <div className="text-sm">Already have an account?<Link to={"/signin"} className="hover:opacity-60"><span className="text-red-600 px-2 font-bold ">Login</span></Link></div>}
                {type == "signin" && <div className="text-sm">Create an account?<Link to={"/signup"} className="hover:opacity-60"><span className="text-red-600 px-2 font-bold ">{ }Signup</span></Link></div>}


            </form>

        </div>

    )
}

export default Auth




const Box = ({ label, placeholder, req, handleChange }: {
    label: string, placeholder: string, req: boolean, handleChange: (e: {
        target: {
            name: any;
            value: any;
        };
    }) => void
}) => {
    return (
        <label className="block mb-4">
            <span className={`${req && "after:content-['*']"} after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize`}>
                {label}
            </span>
            <input type={label} name={label} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-red-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder={placeholder}
                onChange={handleChange} />
        </label>
    )
}
