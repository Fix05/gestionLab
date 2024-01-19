
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login'
import ManagerPage from './pages/manager'
import './App.css'



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager/:id" element={<ManagerPage/>} />
    </Routes>
  )
}

export default App
