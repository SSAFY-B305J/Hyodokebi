import { useNavigate, useParams } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import MenuCard from "../../../components/card/MenuCard";
import FoodTap from "../../../components/food/FoodTap";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import {
  getLikeFood,
  getPlainFood,
  postRecommendFood,
} from "../../../apis/api/food";

interface LikeFoodData {
  menuId: number;
  menuName: string;
  cateImage: number;
}

export default function FoodAdd() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { vipId } = useParams();

  const [foodData, setFoodData] = useState<LikeFoodData[]>([]);
  const [selectedFood, setSelectedFood] = useState<LikeFoodData[]>([]);
  const [addList, setAddList] = useState<number[]>([]);

  const getFoodData = async () => {
    try {
      const data = await getPlainFood();
      setFoodData(data);

      // const data2 = await getLikeFood(Number(vipId));
      // setSelectedFood(selectedFood);
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

  const hanldeNextClick = async () => {
    setLoading(true); // 로딩 상태를 true로 설정하여 Backdrop 표시
    let recData; // recData 변수를 try 블록 밖에서 선언

    try {
      //추천받기
      recData = await postRecommendFood(Number(vipId), addList);
      console.log("FoodAdd에서 받은 recData : ", recData);
    } catch (error) {
      // 오류 처리
    } finally {
      //추천 정보 다음 페이지로 넘기기
      if (recData) {
        localStorage.setItem("recData", JSON.stringify(recData));
      }
      navigate(`/food/result/${vipId}`);
      setLoading(false); // 로딩 상태를 false로 설정하여 Backdrop 숨기기
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
              <div key={index} onClick={() => handleClick(menu.menuId)}>
                <MenuCard
                  key={index}
                  menu_id={menu.menuId}
                  menu_name={menu.menuName}
                  cate_image={0}
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
          <p>효도깨비가 고민중...</p>
        </Backdrop>
        <ButtonAsset
          text="다음"
          variant="outlined"
          className="w-1/4 font-semibold border-2 rounded-3xl hover:border-white "
          onClick={hanldeNextClick}
        />
      </div>
    </div>
  );
}
