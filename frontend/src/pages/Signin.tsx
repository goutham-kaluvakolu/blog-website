import Auth from '../components/Auth'
import Qoute from '../components/Qoute'

const signin = () => {


  return (
    <div className='grid md:grid-cols-2 '>
    <Auth type="signin"/>
    <div className="invisible md:visible">
    <Qoute/>
    </div>
</div>
    
  )
}

export default signin