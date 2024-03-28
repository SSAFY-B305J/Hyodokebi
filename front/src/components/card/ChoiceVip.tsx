interface VipProps {
  id: number;
  name: string;
  imagePath: string;
  imageIndex: string;
}

export default function ChoiceVip({ VipProps }: { VipProps: VipProps }) {
  return (
    <div className="flex flex-col justify-around w-[25vw]] p-2 m-2 border-2 border-gray-300 shadow-md h-[30vh] rounded-xl overflow-hidden">
      <div className="flex justify-center w-full ">
        <img
          src={`/test/picture${[VipProps.imageIndex]}.jpg`}
          alt="empty"
          className="w-[156px] h-[156px] m-2"
        />
      </div>
      <div className="flex justify-center text-2xl font-semibold grow ">
        {VipProps.name}
      </div>
    </div>
  );
}
