import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { flushSync } from "react-dom";


//type of qoute state , it has id , name , qoute
type qouteProps = {
  id: number,
  name: string,
  qoute: string
}
const Qoute = () => {
  //state to store the qoute
  const [qoutes, setQoutes] = useState<qouteProps[]>([{ id: 0, name: "", qoute: "loading .." }])
  const [qoute, setQoute] = useState<qouteProps>({ id: 0, name: "", qoute: "loading .." })

  //state to show loading
  const [loading, setLoading] = useState(true)


  //update the state of qoute every 10 seconds
  const updateQoute = () => {
    //random number from 0 to qoutes.length - 1
    const randomQouteIndex = Math.floor(Math.random() * qoutes.length)
    console.log(randomQouteIndex)
    const randomQoute = qoutes[randomQouteIndex]
    // const randomQoute = qoutes[Math.floor(Math.random() * qoutes.length)]
    setQoute(randomQoute)
    
  }

  useEffect(() => {
    // Fetch all quotes from the database
    axios.get(`${BACKEND_URL}/api/v1/default/qoute`).then((response) => {
      console.log(response.data);
      setQoutes(response.data.qoutes);
      setLoading(false);
      // Start the interval to update the quote every 10 seconds
      const interval = setInterval(updateQoute, 30000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    });
  }, []); 

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    // bg#F3F3F3
    <div className="min-h-screen flex justify-center items-center bg-slate-300">
      <div className="flex-col justify-center p-10">
        <p className="text-3xl font-bold text-center mb-2">{qoute.qoute}</p>
        <p className="text-lg text-center"><span> - </span>{qoute.name}</p>
        {/* <p className="text-md text-atart text-slate-500">Business man</p> */}
      </div>
    </div>

  )
}

export default Qoute