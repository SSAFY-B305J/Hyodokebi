import { Outlet } from "react-router-dom"
import DoubleTab from "../components/tab/DoubleTab"
import MainLayout from "../layouts/Mainlayout"

export default function Mypage () {

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}