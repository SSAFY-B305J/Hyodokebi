import Card from "../card/Card";
import AddCard from "../card/AddCard";

export default function VipList() {
  return (
    <div className="box-border flex w-full h-[67vh] p-3 overflow-auto">
      <div className="grid w-full h-full grid-cols-3 gap-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <AddCard />
      </div>
    </div>
  );
}
