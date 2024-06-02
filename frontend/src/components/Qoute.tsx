import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

// Type definition for the quote state
type QouteProps = {
  id: number;
  name: string;
  qoute: string;
};

const Qoute = () => {
  // State to store all quotes
  const [qoutes, setQoutes] = useState<QouteProps[]>([]);
  // State to store the current quote
  const [qoute, setQoute] = useState<QouteProps>({ id: 0, name: "", qoute: "loading .." });
  // State to show loading
  const [loading, setLoading] = useState(true);

  // Update the state of the quote every 10 seconds
  const updateQoute = () => {
    if (qoutes.length > 0) {
      const randomQouteIndex = Math.floor(Math.random() * qoutes.length);
      const randomQoute = qoutes[randomQouteIndex];
      setQoute(randomQoute);
    }
  };

  useEffect(() => {
    // Fetch all quotes from the database
    axios.get(`${BACKEND_URL}/api/v1/default/qoute`).then((response) => {
      setQoutes(response.data.qoutes);
      setLoading(false);
    });
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    // Only set up the interval if we have quotes
    if (qoutes.length > 0) {
      const interval = setInterval(updateQoute, 10000);
      // Set the initial quote
      updateQoute();
      // Cleanup function to clear the interval when the component unmounts or qoutes change
      return () => clearInterval(interval);
    }
  }, [qoutes]); // Dependency on qoutes ensures this runs when qoutes state changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex-col justify-center p-10">
        <p className="text-3xl font-bold text-center mb-2">{qoute.qoute}</p>
        <p className="text-lg text-center"><span> - </span>{qoute.name}</p>
      </div>
    </div>
  );
};

export default Qoute;
