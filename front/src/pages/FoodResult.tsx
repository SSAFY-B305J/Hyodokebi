import MainLayout from "../layouts/Mainlayout";
import FoodTap from "../components/food/FoodTap";
import MenuCard from "../components/card/MenuCard";
import Card from "../components/card/Card";

export default function FoodResult() {
  return (
    <MainLayout>
      <div className="flex flex-col mt-5">
        <div className="flex justify-center text-3xl font-bold mb-7">
          효도깨비가 추천하는 식사메뉴
        </div>
        <div className="flex">
          <FoodTap />
        </div>
        <div className="flex justify-center mt-5 mb-5 text-xl font-semibold ">
          메뉴를 누르시면 주변의 음식점의 위치를 알려드립니다
        </div>
        <div className="flex ">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="flex mt-3 justify-evenly h-14 ">
          <div className="flex w-1/4">
            <button className="w-full font-semibold border border-2 rounded-3xl border-primary text-primary">
              다시 추천하기
            </button>
          </div>
          <div className="flex w-1/4 ">
            <button className="w-full font-semibold border border-2 rounded-3xl border-primary text-primary">
              처음으로
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
