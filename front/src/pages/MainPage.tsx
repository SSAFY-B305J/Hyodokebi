  import Card from "../components/card/Card";
  import MainHeader from "../components/header/MainHeader";
  import TopicBox from "../components/topic/TopicBox";

  export default function MainPage() {

    return (
      <div className="flex flex-col w-screen h-screen">
        <MainHeader props={true} />
        <div className="flex items-center justify-center flex-1">
          <TopicBox />
        </div>
      </div>
    )
  }