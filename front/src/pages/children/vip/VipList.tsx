import VipCard from "../../../components/card/VipCard";
import VipAddCard from "../../../components/card/VipAddCard";
import VipTestData from "../../../json/VipTestData.json"

interface VipTest {
  id: number;
  name: string;
  imagePath: string;
  imageIndex: string;
}

export default function VipList() {
  return (
    <div className="box-border flex w-full h-[67vh] p-3 overflow-auto">
      <div className="grid w-full h-full grid-cols-3 gap-3">
        {VipTestData.map((VipTest : VipTest)=> (
          <VipCard key={VipTest.id} VipProps={VipTest} />
        )
        )

        }
        <VipAddCard />
      </div>
    </div>
  );
}
