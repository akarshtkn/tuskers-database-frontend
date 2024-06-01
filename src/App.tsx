import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/dashboard' element={<Dashboard />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App