import { Link, useNavigate } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import MenuCard from "../../../components/card/MenuCard";
import { useEffect, useState } from "react";
import { getPlainFood, postAddFood } from "../../../apis/api/food";
import useLoginStore from "../../../store/useLoginStore";
import { getVipList, postVip } from "../../../apis/api/vip";

interface LikeFoodData {
  menuId: number;
  menuName: string;
  cateImage: number;
}
interface VipLists {
  vipId: number;
  vipNickname: string;
  vipBirth: number;
  vipProfile: number;
  vipAgeGroups: number;
}

export default function VipAddFood() {
  const navigate = useNavigate();
  const { loginMemberIdx } = useLoginStore();

  const [foodData, setFoodData] = useState<LikeFoodData[]>([]);
  const [addList, setAddList] = useState<number[]>([]);

  const [VipListData, setVipListData] = useState<VipLists[]>([]);

  let vipId = -1; // 생성할 vip의 id

  const fetchVipList = async () => {
    try {
      const data = await getVipList();

      // vipId를 찾기 위해 vipList 마지막 등록된 vipId를 불러옴
      vipId = data.length > 0 ? data[data.length - 1].vipId : 0;

      setVipListData(data);
    } catch (error) {
      console.error("Error fetching VIP list:", error);
    }
  };
  //음식 메뉴 나열
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
  //vip 생성 및 선호 음식 추가
  const handleSave = async () => {
    try {
      const vipData = JSON.parse(localStorage.getItem("vipData") || "{}");

      // VIP 데이터 추가
      await postVip(vipData.vipNickname, vipData.vipBirth, vipData.vipProfile);

      // VIP 데이터 추가가 성공하면 VIP 목록을 다시 가져옴
      await fetchVipList();

      // 음식 데이터 추가
      await postAddFood(vipId, addList);

      // 마이페이지 VIP 탭으로 이동
      navigate(`/mypage/${loginMemberIdx}/vip`);
    } catch (error) {
      console.error("Error handling save:", error);
      // 에러 처리 추가
    }
  };

  useEffect(() => {
    getFoodData();

    return () => {
      // 페이지를 벗어날 때 로컬스토리지를 지우는 코드
      localStorage.removeItem("vipData");
    };
  }, []);

  return (
    <div className="flex flex-col mt-5 ">
      <div className="flex justify-center text-3xl font-bold mb-7">
        최소 5개 이상의 선호 음식을 선택해주세요
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
        <ButtonAsset
          text="저장"
          variant="outlined"
          className="w-1/4 font-semibold border-2 rounded-3xl hover:border-white "
          onClick={handleSave}
          disabled={addList.length < 5}
        />
      </div>
    </div>
  );
}
