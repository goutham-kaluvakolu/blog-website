import { Link } from "react-router-dom"

type SecondaryNav = {
    tags: string[],
    activeTag:string,
    handleActiveTagChange:(tag: string) => void
}

const SecondaryNav = ({ tags,activeTag,handleActiveTagChange }: SecondaryNav) => {
    return (
        <div className="w-full flex flex overflow-x-auto scrollbar-hide border-b-2 pl-8 pr-8 items-start">
            <Link to={"/profile"} className="text-slate-500 text-2xl mr-5 cursor-pointer hover:text-black">+</Link>
            <div className={`text-slate-500 ${activeTag=="Foryou"&&"border-b-2 font-bold border-black text-black"} mr-5 pb-5 cursor-pointer  hover:text-black`} onClick={()=>handleActiveTagChange("Foryou")}>Foryou</div>
            <div className={`text-slate-500 ${activeTag=="Following"&&"border-b-2 font-bold border-black text-black"} mr-5 pb-5 cursor-pointer text-slate-500 hover:text-black`} onClick={()=>handleActiveTagChange("Following")}>Following</div>
            {
            tags.map((tag: string) => {
                return (
                    <div className={`${activeTag==tag&&"border-b-2 font-bold border-black text-black"} mr-5 pb-5 cursor-pointer text-slate-500 hover:text-black`} onClick={()=>handleActiveTagChange(tag)}>{tag}</div>
                )
            })
        }</div>
    )
}

export default SecondaryNav