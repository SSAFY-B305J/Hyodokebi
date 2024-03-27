import UnderLine from "../../../components/common/UnderLine";
import FoodTap from "../../../components/food/FoodTap";
import MainLayout from "../../../layouts/Mainlayout";
import VipCard from "../../../components/card/VipCard";
import VipTestData from "../../../json/VipTestData.json";

interface VipProps {
  id: number;
  name: string;
  imagePath: string;
  imageIndex: string;
}

const vipDataList: VipProps[] = [
  {
    id: 1,
    name: "John Doe",
    imagePath: "../../../assets/test.jpg",
    imageIndex: "A",
  },
  {
    id: 1,
    name: "Jane Smith",
    imagePath: "/path/to/image2.jpg",
    imageIndex: "B",
  },
  {
    id: 1,
    name: "John Doe2",
    imagePath: "/path/to/image1.jpg",
    imageIndex: "A",
  },
  {
    id: 1,
    name: "Jane Smith2",
    imagePath: "/path/to/image2.jpg",
    imageIndex: "B",
  },
];

export default function FoodChoice() {
  return (
    <MainLayout>
      <div>
        <div className="flex justify-center text-3xl font-bold mb-7">
          효도깨비의 VIP를 알려주세요
        </div>

        <div className="flex justify-center mb-5">
          <FoodTap index={1} />
        </div>
        <div className="ml-20 mr-20 border">
          <div>
            <UnderLine
              text="지역을 골라주세요"
              size="sm"
            />
          </div>
          <div className="mt-5">
            <UnderLine
              text="VIP는 누구?"
              size="sm"
            />
            <div className="flex flex-row ">
              {vipDataList.map((vipData, index) => (
                <VipCard
                  key={index}
                  VipProps={vipData}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
