
import {Routes, Route} from 'react-router-dom'
import Meals from './pages/Melas'
const App = () => {
  return (
    <div>
    

      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/meals" element={<Meals />} />
      </Routes> 
    </div>
  )
}

export default App
