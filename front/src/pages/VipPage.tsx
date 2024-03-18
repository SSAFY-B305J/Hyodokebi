import MainHeader from "../components/header/MainHeader";
import FoodLine from "../components/vip/FoodLine";

export default function VipPage() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <MainHeader isLogin={true} />
      <div className="flex items-center justify-center flex-1">
        <FoodLine />
      </div>
    </div>
  );
}
