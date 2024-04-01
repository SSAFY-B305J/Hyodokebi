import { Outlet, useParams } from "react-router-dom";
import useTabStore from "../../store/useTabStore";
import { useEffect, useState } from "react";
import { getLikeFood } from "../../apis/api/food";
import MenuCard from "../card/MenuCard";

interface LikeFoodData {
  menu_id: number;
  menu_name: string;
  cate_image: number;
}

export default function InfoTab() {
  const { tabIndex, setTabIndex } = useTabStore();
  const { memberId } = useParams<string>();
  const memberIdAsNumber = parseInt(memberId || "", 10);
  console.log(memberIdAsNumber);
  const [likeFood, setLikeFood] = useState<LikeFoodData[]>([]);

  useEffect(() => {
    async function getLikedFood() {
      try {
        const data = await getLikeFood(memberIdAsNumber);
        setLikeFood(data);
      } catch (error) {
        console.error("Error fetching VIP Detail:", error);
      }
    }

    getLikedFood();
  }, []);

  const disabled =
    "flex items-center justify-center w-1/2 shadow-md h-full duration-300 text-xl font-semibold border-b border-current";
  const activated =
    "flex items-center justify-center w-1/2 shadow-md h-full bg-secondary duration-300 text-xl font-semibold border-current border-t border-l border-r";

  return (
    <div className="flex flex-col w-[66vw] m-3 h-[10vh] p-2 box-border">
      <div className="flex flex-row w-[66vw] h-[8vh] box-border">
        <div
          className={tabIndex === 0 ? activated : disabled}
          onClick={() => setTabIndex(0)}
        >
          음악
        </div>
        <div
          className={tabIndex === 1 ? activated : disabled}
          onClick={() => setTabIndex(2)}
        >
          좋아하는 메뉴
        </div>
        {/* <div
          className={tabIndex === 2 ? activated : disabled}
          onClick={() => setTabIndex(1)}
        >
          음식점
        </div> */}
      </div>
      {tabIndex === 0 ? (
        <div className="flex justify-center w-full h-[72vh]"></div>
      ) : (
        ""
      )}
      {tabIndex === 1 ? (
        <div className="flex justify-center w-full h-[72vh]">
          {likeFood.map((menu, index) => (
            <MenuCard
              key={index}
              menu_id={menu.menu_id}
              menu_name={menu.menu_name}
              cate_image={menu.cate_image}
            />
          ))}
        </div>
      ) : (
        ""
      )}
      {/* {tabIndex === 2 ? (
        <div className="flex justify-center w-full h-[72vh]"></div>
      ) : (
        ""
      )} */}
    </div>
  );
}
