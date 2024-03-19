import { useState } from "react";

import TopicBox from "../components/topic/TopicBox";
import MainLayout from "../layouts/Mainlayout";


export default function MainPage() {

  const [isLogin, setIsLogin] = useState(false)
  // ALERT MainLayout에서 전역적으로 isLogin을 관리하도록 해야할지?
  
  return (
    <MainLayout>
      <TopicBox isLogin={isLogin} />
    </MainLayout>
  )
}