import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home'
import AddPlayer from './pages/addplayer'
import PlayerDetails from './pages/playerdetails'
import Login from './pages/login'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/player-add" element={<AddPlayer />} />
        <Route path="/player-details" element={<PlayerDetails />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App