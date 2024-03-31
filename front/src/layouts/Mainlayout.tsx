import MainHeader from "../components/header/MainHeader";
import useLoginStore from "../store/useLoginStore";

type MainLayoutProps = {
  children: JSX.Element;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { getIsLogin } = useLoginStore();

  return (
    <div className="flex flex-col h-screen">
      <MainHeader isLogin={getIsLogin()} />
      <div className="flex items-center justify-center flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
