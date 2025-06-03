import { useState } from 'react'
import Header from "./router/Header";
import ChatBox from './components/ChatBox'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <div className='w-[50%] mx-auto'>
          <ChatBox />
        </div>
        <div className="flex flex-1">
        </div>
      </div>
    </>
  )
}

export default App
