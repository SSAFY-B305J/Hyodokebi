  import MainHeader from "../components/header/MainHeader";
  import TopicBox from "../components/topic/TopicBox";

  export default function MainPage() {

    return (
      <div className="flex flex-col w-screen h-screen">
        <MainHeader isLogin={true} />
        <div className="flex items-center justify-center flex-1">
          <TopicBox />
        </div>
      </div>
    )
  }