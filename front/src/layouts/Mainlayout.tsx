import MainHeader from "../components/header/MainHeader"

type MainLayoutProps = {
  children: JSX.Element
}

export default function MainLayout ({children} : MainLayoutProps) {

  // const [isLogin, setIsLogin] = useState(false)
  const isLogin = false
  // TODO 로그인 판명 로직 : cookie를 사용하거나.

  return (
    <div className="flex flex-col w-screen h-screen">
      <MainHeader isLogin={isLogin} />
      <div className="flex items-center justify-center flex-1">
        {children}
      </div>
    </div>
  )
}