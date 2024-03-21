import { Outlet } from "react-router-dom"
import MainLayout from "../layouts/Mainlayout"

export default function Mypage () {

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}