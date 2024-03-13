import { useState } from "react"

import MainHeader from "../components/header/MainHeader"

export default function Mypage () {

  const [isLogin, setIsLogin] = useState(false)
  
  return (
    <div className="flex flex-col w-screen h-screen">
      <MainHeader isLogin={isLogin} />
      <div className="flex items-center justify-center flex-1">
      </div>
    </div> 
  )
}