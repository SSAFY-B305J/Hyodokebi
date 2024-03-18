export default function FormContainer(props: { children: JSX.Element }) {
  return (
    <div className="box-border relative flex flex-col align-middle w-[500px] px-[80px] py-[42px] rounded-2xl shadow-lg *:mb-5">
      {props.children}
    </div>
  );
}
