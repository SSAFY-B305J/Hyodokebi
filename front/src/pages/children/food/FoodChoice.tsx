import UnderLine from "../../../components/common/UnderLine";
import FoodTap from "../../../components/food/FoodTap";
import MainLayout from "../../../layouts/Mainlayout";
import ChoiceVip from "../../../components/card/ChoiceVip";
import Dropdown from "../../../components/common/Dropdowns";

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
    imagePath: "/src/assets/test.jpg",
    imageIndex: "0",
  },
  {
    id: 1,
    name: "Jane Smith",
    imagePath: "https://placehold.co/600x400",
    imageIndex: "1",
  },
  {
    id: 1,
    name: "John Doe2",
    imagePath: "/path/to/image1.jpg",
    imageIndex: "2",
  },
  {
    id: 1,
    name: "Jane Smith2",
    imagePath: "/path/to/image2.jpg",
    imageIndex: "3",
  },
];

const items = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

function handleSelect(value: string) {
  console.log("Selected:", value);
}

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
            {/* <div className="flex flex-row">
              <Dropdown
                category="시/도"
                cities={items}
                onSelect={handleSelect}
              />
              <Dropdown
                text="시/군/구"
                items={items}
                onSelect={handleSelect}
              />
            </div> */}
          </div>
          <div className="mt-5">
            <UnderLine
              text="VIP는 누구?"
              size="sm"
            />
            <div className="flex flex-row justify-center">
              {vipDataList.map((vipData, index) => (
                <ChoiceVip
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
