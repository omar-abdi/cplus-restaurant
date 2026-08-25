
import {Routes, Route} from 'react-router-dom'
import Meals from './pages/Melas'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Details from './pages/Details'
const App = () => {
  return (
    <div>
      <Navbar />
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route   path="/login" element={<Login />} />
        <Route   path="/signup" element={<Signup />} />
        <Route   path="/details" element={<Details />} />
        <Route path="/meals" element={<Meals />} />
      </Routes> 
    </div>
  )
}

export default App
