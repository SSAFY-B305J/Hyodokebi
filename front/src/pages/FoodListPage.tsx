import FoodList from "../components/food/FoodList";
import MainLayout from "../layouts/Mainlayout";
// import MapList from "../components/food/map/MapList";
import Mapmap from "../components/food/map/Mapmap";
import Button from "../components/Button/Button";

export default function FoodListPage() {
  return (
    <MainLayout>
      <div className="flex flex-col border border-current">
        <div className="flex p-5 text-2xl font-semibold border border-current">
          메뉴 프록스 자리
        </div>
        <div className="flex p-3 border border-current ">
          <div className="flex border border-current">지역</div>
          <div className="flex flex-row ">
            <div className="flex border border-current">하나</div>
            <div className="flex border border-current">둘</div>
            <div className="flex border border-current">셋</div>
          </div>
        </div>
        <div className="flex border-current ">
          <Mapmap />
        </div>
        <div className="flex flex-row justify-end">
          <div className="flex border border-current grow">음식점 정보</div>
          <div className="flex border border-current">버튼-저장하기</div>
        </div>
      </div>
    </MainLayout>
  );
}
