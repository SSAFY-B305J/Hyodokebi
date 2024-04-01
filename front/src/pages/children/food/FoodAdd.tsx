import { Link, useParams } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import MenuCard from "../../../components/card/MenuCard";
import FoodTap from "../../../components/food/FoodTap";
import { useEffect, useState } from "react";
import { getPlainFood, postAddFood } from "../../../apis/api/food";

interface LikeFoodData {
  menuId: number;
  menuName: string;
  cateImage: number;
}

export default function FoodAdd() {
  const { vipId } = useParams();

  const [foodData, setFoodData] = useState<LikeFoodData[]>([]);
  const [addList, setAddList] = useState<number[]>([]);

  const getFoodData = async () => {
    try {
      const data = await getPlainFood();
      setFoodData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = (menuId: number) => {
    if (addList.includes(menuId)) {
      // 이미 addList에 있는 경우 해당 menu_id를 제외
      const updatedList = addList.filter((id) => id !== menuId);
      setAddList(updatedList);
    } else {
      // addList에 없는 경우 해당 menu_id를 추가
      setAddList([...addList, menuId]);
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

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
          {foodData ? (
            foodData.map((menu, index) => (
              <div onClick={() => handleClick(menu.menuId)}>
                <MenuCard
                  key={index}
                  menu_id={menu.menuId}
                  menu_name={menu.menuName}
                  cate_image={menu.cateImage}
                  className={
                    addList.includes(menu.menuId) ? "border-primary" : ""
                  }
                />
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-3 ">
        <Link
          to={`/food/result/${vipId}`}
          className="w-1/4"
        >
          <ButtonAsset
            text="다음"
            variant="outlined"
            className="w-full font-semibold border-2 rounded-3xl hover:border-white "
            onClick={() => {
              postAddFood(Number(vipId), addList);
            }}
          />
        </Link>
      </div>
    </div>
  );
}
