import Input from "../common/Input";
import Card from "../card/Card";
import AddCard from "../card/AddCard";

export default function VipCreate() {
  console.log("드르렁");
  return (
    <div className="box-border flex flex-col justify-center w-3/4 h-[80vh]">
      <div className="flex justify-center m-2 text-3xl font-semibold">
        VIP 추가
      </div>
      <div className="flex w-3/4 m-2">
        <Input id="nickname" label="닉네임" />
      </div>
      <div className="m-2 font-semibold">프로필 사진</div>
      <div className="flex w-full">
        <img src="https://picsum.photos/96/96" alt="empty" className="mx-3" />
        <div className="grid grid-cols-4 gap-3">
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
        </div>
      </div>
      <div className="m-2 font-semibold">선호 음식</div>
      <div className="box-border flex w-full h-[67vh] p-3 overflow-auto">
        <div className="grid w-full h-full grid-cols-5 gap-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
