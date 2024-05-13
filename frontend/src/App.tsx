
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Writeblog from './pages/Writeblog'
import Appbar from './components/Appbar'
import Author from './pages/Author'
import Account from './pages/Account'
import Profile from './pages/Profile'
import Library from './pages/Library'
import Summary from './pages/Summary'
import {
  RecoilRoot
} from 'recoil'

function App() {

  return (
    <>
      <BrowserRouter>
      <RecoilRoot>
      <Appbar/>
      <div className='m-6'>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/writeblog" element={<Writeblog />} />
          <Route path="/Author/:id" element={<Author />} />
          <Route path="/Account/:id" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/summary" element={<Summary />} />

          <Route path="/*" element={<Signin />} />
        </Routes>
      </div>
        </RecoilRoot>
      </BrowserRouter>
    </>
  )
}

export default App
