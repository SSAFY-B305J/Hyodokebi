import MainHeader from "../components/header/MainHeader";

type MainLayoutProps = {
  children: JSX.Element;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex items-center justify-center flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
