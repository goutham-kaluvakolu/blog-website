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

    const [passwordType, setPasswordType] = useState("password")

    const signup = [{ label: "username", placeholder: "username", req: false }, { label: "email", placeholder: "you@example.com", req: true }]
    const signin = [{ label: "email", placeholder: "you@example.com", req: true }]

    let fields = type == "signin" ? signin : signup

    const navigate = useNavigate();

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        console.log("handle chnage")
        const { name, value } = e.target;
        setPostInputs(prev => ({ ...prev, [name]: value }))
    }
    
    const handleEyeToggle = () => {
        console.log("handle eye chnage")
        if (passwordType=="text"){
            setPasswordType("password")
        }else{
            setPasswordType("text")
        }
    }

    const url = type == "signin" ? `${BACKEND_URL}/api/v1/user/signin` : `${BACKEND_URL}/api/v1/user/signup`
    async function handleSubmit() {
        console.log(postInputs)
        console.log("handle submit")

        try {
            const response = await axios.post(url, postInputs)
            console.log("response", response)
            localStorage.setItem("jwt", response.data.jwt)
            localStorage.setItem("userId", response.data.id)
            localStorage.setItem("userName", response.data.name)
            navigate("/blogs")
            console.log(localStorage.getItem("jwt"))
        }
        catch (e) {
            console.log("error", e)
        }

    }

    return (

        <div className="flex justify-center">

            <form className="min-h-screen flex flex-col justify-center w-2/3">
                {fields.map((field) => <Box label={field.label} placeholder={field.placeholder} req={field.req} handleChange={handleChange} />)}
                <PasswordBox label={"password"} req={true} handleChange={handleChange} inputType={passwordType} handleEyeToggle={handleEyeToggle}/>
                <div className="flex items-center justify-between mt-4 w-full mb-4" >
                    <button className="w-full bg-red-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        onClick={handleSubmit}>
                        {type == "signin" ? "Login" : "Sign up"}
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

const PasswordBox = ({ label, req, handleChange, inputType, handleEyeToggle }: {
    label: string, req: boolean, handleChange: (e: {
        target: {
            name: any;
            value: any;
        };
    }) => void,
    inputType: string,
    handleEyeToggle:()=>void
}) => {
    return (
        
        <label className="block mb-4">
            <span className={`${req && "after:content-['*']"} after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize`}>
                {label}
            </span>
            <div className="relative block mb-4">
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                {inputType=="password"&&<svg onClick={handleEyeToggle}  className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>}
                {inputType=="text"&&<svg  onClick={handleEyeToggle} className="h-5 w-5 text-slate-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>}
            </div>
            <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-red-500 block w-full rounded-md sm:text-sm focus:ring-1"
                id="password" type={inputType} placeholder="password" onChange={handleChange}
            />
        </div>
        </label>
    )
}


