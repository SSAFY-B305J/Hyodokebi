import { useState } from "react";
import { Outlet } from "react-router-dom";

import TopicBox from "../components/topic/TopicBox";
import MainLayout from "../layouts/Mainlayout";


export default function MainPage() {

  
  // ALERT MainLayout에서 전역적으로 isLogin을 관리하도록 해야할지?
  
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}