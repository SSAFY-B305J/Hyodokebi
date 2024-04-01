import { Link, NavLink, useParams } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import FoodResultCard from "../../../components/card/FoodResultCard";
import FoodTap from "../../../components/food/FoodTap";
import React, { useState, useEffect } from "react";
import { postRecommendFood } from "../../../apis/api/food";

interface CardProps {
  menuId: number;
  menuName: string;
  cateImage: number;
}

export default function FoodResult() {
  const { vipId } = useParams();
  const [startIndex, setStartIdex] = useState(0);
  const itemsPerPage = 3;

  const [foods, setFoods] = useState<CardProps[]>([]);

  const getRecommendFood = async () => {
    try {
      const data = await postRecommendFood(Number(vipId));
      setFoods(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRetryClick = () => {
    console.log("다시 추천하기");
    setStartIdex(startIndex + itemsPerPage);
  };

  useEffect(() => {
    getRecommendFood(); // fetchData 함수 호출
  }, []);

  return (
    <div className="flex flex-col mt-5 ">
      <div className="flex justify-center text-3xl font-bold mb-7">
        효도깨비가 추천하는 식사메뉴
      </div>
      <div className="flex justify-center mb-5">
        <FoodTap index={3} />
      </div>
      <div className="flex justify-center mb-5 text-xl font-semibold ">
        메뉴를 누르시면 주변의 음식점의 위치를 알려드립니다
      </div>

      <div className="flex justify-around mb-4 ">
        {foods ? (
          foods
            .slice(startIndex, startIndex + itemsPerPage)
            .map((menu, index) => (
              // <div onClick={() => handleClick(menu.menuId)}>
              <FoodResultCard
                key={index}
                menu_id={menu.menuId}
                menu_name={menu.menuName}
                cate_image={menu.cateImage}
              />
              // </div>
            ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="flex flex-row mt-3 mb-4 h-14">
        <div className="flex justify-center grow ">
          <ButtonAsset
            text="다시 추천하기"
            variant="outlined"
            className="w-1/2 font-semibold border-2 rounded-3xl hover:border-secondary"
            onClick={handleRetryClick}
            disabled={startIndex + itemsPerPage >= foods.length}
          />
        </div>
        <div className="flex justify-center grow">
          <Link
            to={"/food/choice"}
            className="w-1/2"
          >
            <ButtonAsset
              text="처음으로"
              variant="outlined"
              className="w-full h-full font-semibold border-2 rounded-3xl hover:border-secondary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
