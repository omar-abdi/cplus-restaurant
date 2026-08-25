
import { Link } from 'react-router-dom'

const Navbar = () => {  
  return (
    <div>
      <h1>Cplus restaurant</h1>
      <img    src="./public/logo.png" alt="logo" className="w-24 h-24 rounded-full" />
      <Link to="/">Home</Link>
      <Link to="/meals">Meals</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/details">Details</Link>
    </div>
  )
}

export default Navbar
