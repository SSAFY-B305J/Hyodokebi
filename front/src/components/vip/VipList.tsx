import VipCard from "../card/VipCard";
import VipAddCard from "../card/VipAddCard";

export default function VipList() {
  return (
    <div className="box-border flex w-full h-[67vh] p-3 overflow-auto">
      <div className="grid w-full h-full grid-cols-3 gap-3">
        <VipCard />
        <VipCard />
        <VipCard />
        <VipCard />
        <VipAddCard />
      </div>
    </div>
  );
}
