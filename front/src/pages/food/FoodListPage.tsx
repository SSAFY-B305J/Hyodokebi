import Mapmap from "../../components/food/map/Mapmap";

export default function FoodListPage() {
  return (
    <div className="flex flex-col ">
      <div className="flex p-3 pt-0 pb-1 ml-2 text-3xl font-semibold">
        메뉴 프록스 자리
      </div>
      <div className="flex h-20 p-1 mb-1 ">
        <div className="flex items-center justify-center w-1/4 m-2 mr-3 text-xl font-bold border-2 text-primary border-primary">
          지역
        </div>
        <div className="flex flex-row p-3 grow">
          <div className="flex w-1/6 mr-3 ">
            <button className="flex items-center justify-center w-full bg-white drop-shadow-lg border-silver rounded-2xl w-10screen">
              하나
            </button>
          </div>
          <div className="flex w-1/6 mr-3 ">
            <button className="flex items-center justify-center w-full bg-white drop-shadow-lg border-silver rounded-2xl">
              둘
            </button>
          </div>
          <div className="flex w-1/6 ">
            <button className="flex items-center justify-center w-full bg-white drop-shadow-lg border-silver rounded-2xl">
              셋
            </button>
          </div>
        </div>
      </div>
      <div className="flex border-current ">
        <Mapmap />
      </div>
      <div className="flex flex-row justify-end justify-around mt-5 ">
        <div className="flex justify-between m-2 border-primary grow">
          <div className="flex m-1 ml-4 font-bold ">성심당 부띠끄</div>
          <div className="flex m-1 font-medium ">
            대전광역시 중구 대종로 480 중구 대종로 480
          </div>
          <div className="flex m-1 mr-4 font-semibold ">010-0000-0000</div>
        </div>
        <div className="flex w-1/6 pl-3 pr-3">
          <button className="flex items-center justify-center w-full h-full bg-white drop-shadow-lg text-primary border-primary rounded-3xl">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
