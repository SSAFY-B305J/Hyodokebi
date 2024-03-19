import MainHeader from "../components/header/MainHeader";
import FoodList from "../components/food/FoodList";
import BasicMap from "../components/food/map/BasicMap";
// import MapList from "../components/food/map/MapList";
// import Mapmap from "../components/food/map/Mapmap";

export default function FoodListPage() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <MainHeader isLogin={true} />
      <div className="flex border border-current">
        <div className="flex border border-current">메뉴</div>
        <div className="flex border border-current">
          <div className="flex border border-current">지역</div>
          <div>
            <div className="flex border border-current">하나</div>
            <div className="flex border border-current">둘</div>
            <div className="flex border border-current">셋</div>
          </div>
        </div>
        <div className="flex border border-current">{/* <Mapmap /> */}</div>
        <div>
          <div className="flex border border-current">음식점 정보</div>
          <div className="flex border border-current">버튼-저장하기</div>
        </div>
      </div>
    </div>
  );
}
