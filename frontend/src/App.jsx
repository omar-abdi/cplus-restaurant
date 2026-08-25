
import {Routes, Route} from 'react-router-dom'
import MealsComponent from './pages/Melas'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Details from './pages/Details'
import Drinks from './pages/Drinks'
import Cart from './pages/cart'
import Dashboard from './pages/dashbroad'
import Addfood from './pages/Addfood'
import Adddrink from './pages/Adddrink'
const App = () => {
  return (
    <div>
      <Navbar />
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route   path="/login" element={<Login />} />
        <Route   path="/signup" element={<Signup />} />
        <Route   path="/details" element={<Details />} />
        <Route   path="/drinks" element={<Drinks />} />
        <Route   path="/cart" element={<Cart />} />
        <Route path="/meals" element={<MealsComponent />} />
        <Route path="/dashboard/Addfood" element={<Addfood />} />
        <Route path="/dashboard/drinks" element={<Adddrink />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes> 
    </div>
  )
}

export default App
