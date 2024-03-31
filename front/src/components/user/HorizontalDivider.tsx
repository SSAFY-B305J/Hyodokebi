export default function HorizontalDivider(props: { text?: string }) {
  return (
    <div className="relative">
      <div className="my-7 border-t-2 border-[#585858]"></div>
      {props.text ? (
        <div className="absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-white px-6">
          {props.text}
        </div>
      ) : null}
    </div>
  );
}
