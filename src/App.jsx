import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import LoanApplicationPage from './pages/LoanApplicationPage/LoanApplicationPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Dashboard' element={<LoanApplicationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
