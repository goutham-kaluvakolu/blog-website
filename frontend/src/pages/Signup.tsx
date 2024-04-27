import Auth from '../components/Auth'
import Qoute from '../components/Qoute'

function signup() {
  return (
    <div className='grid md:grid-cols-2 '>
        <Auth type="signup"/>
        <div className="invisible md:visible">
        <Qoute/>
        </div>
    </div>
  )
}

export default signup