
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Writeblog from './pages/Writeblog'
import Appbar from './components/Appbar'

function App() {

  return (
    <>
      <BrowserRouter>
      <Appbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/writeblog" element={<Writeblog />} />
          <Route path="/*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
