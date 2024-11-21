import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUpPage } from './components/signup'
import { SignInPage } from './components/signin'
import { Dashboard } from './components/dashboard'
import { SendMoneyPage } from './components/sendmoney'

function App() {
  return (
    <div className='bg-black-500 min-h-screen w-screen'>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/signin" element={<SignInPage />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/send" element={<SendMoneyPage />}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
