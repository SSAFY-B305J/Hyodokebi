interface ButtonProps {
  text: string;
  varient?: string;
}

interface ButtonColorType {
  [key: string]: string;
}

export default function CommonButton({
  text,
  varient = "filled",
}: ButtonProps) {
  const buttonColors: ButtonColorType = {
    filled: "bg-primary hover:bg-primary-hover text-white",
    outlined:
      "bg-white border border-primary hover:border-secondary text-primary hover:text-secondary",
    text: "text-black bg-white hover:bg-gray-200",
  };

  return (
    <button className={`px-5 py-2 rounded-md ${buttonColors[varient]}`}>
      {text}
    </button>
  );
}
