import { Link } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import MenuCard from "../../../components/card/MenuCard";
import FoodTap from "../../../components/food/FoodTap";

export default function FoodAdd() {
  return (
    <div className="flex flex-col mt-5 ">
      <div className="flex justify-center text-3xl font-bold mb-7">
        VIP님께서 선호하는 음식을 골라주세요
      </div>
      <div className="flex justify-center mb-2">
        <FoodTap index={2} />
      </div>
      <div className="flex pl-5 text-sm font-medium">
        오늘 더 땡기는 음식이 있나요? 선택 후 다음을 눌러주세요.
      </div>
      <div className="flex w-full h-[55vh] p-2 overflow-auto">
        <div className="grid w-full h-full grid-cols-5 gap-3">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
        {/* 무한스크롤 고려? */}
      </div>
      <div className="flex justify-center mt-3 ">
        <Link
          to={"/food/result"}
          className="w-1/4"
        >
          <ButtonAsset
            text="다음"
            variant="outlined"
            className="w-full font-semibold border-2 rounded-3xl hover:border-white "
          />
        </Link>
      </div>
    </div>
  );
}
