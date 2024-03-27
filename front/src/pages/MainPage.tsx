import { Outlet } from "react-router-dom";

import MainLayout from "../layouts/Mainlayout";


export default function MainPage() {

  
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}