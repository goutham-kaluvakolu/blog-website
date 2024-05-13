import { useState } from "react"
type shareProps = {
  count: number
}
const Shares = ({ count }: shareProps) => {
  const maxCount = count + 1

  const [shares, setShares] = useState<number>(count)
  function handleShare() {
    if (shares < maxCount) {
      setShares(prev => prev + 1)
    }
  }
  return (
    <div className="flex" onClick={handleShare}>
      <Share /> {shares}
    </div>
  )
}

export default Shares

const Share = () => {
  return (
    <div>
      <svg className=" mr-2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />  <polyline points="16 6 12 2 8 6" />  <line x1="12" y1="2" x2="12" y2="15" /></svg>
    </div>
  )
}



