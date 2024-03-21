import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type InputAttribute = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface InputAssetProps {
  className?: string;
  type?: string;
  iconVisible?: boolean;
}

export default function InputAsset({
  className,
  type = "text",
  iconVisible = type === "password", // 좌측 아이콘 표시 여부
  ...InputAttribute
}: InputAssetProps & InputAttribute) {
  const inputCSS =
    "w-full px-3 py-3 text-sm border border-silver rounded box-border focus:outline-none focus:border-secondary";

  const [isVisible, setIsVisible] = useState<boolean>(false); // value 표시/감춤 여부
  const [inputType, setInputType] = useState<string>(type); // 상태 관리되는 type

  // 비밀번호 표시/감춤
  function togglePasswordVisibility(): void {
    setIsVisible(!isVisible);
    setInputType(inputType === "password" ? "text" : "password");
    console.log(isVisible);
  }

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        {...InputAttribute}
        className={`${inputCSS} ${className} ${iconVisible && "pr-14"}`}
      />
      {/* type이 password일 때만 생성되는 비밀번호 표시/감춤 버튼 */}
      {type === "password" && iconVisible && (
        <button
          className="absolute top-1/2 translate-y-[-50%] right-4"
          onClick={togglePasswordVisibility}
        >
          <EyeIcon isVisible={isVisible} />
        </button>
      )}
    </div>
  );
}

// 비밀번호 표시/감춤 아이콘
function EyeIcon(props: { isVisible: boolean }) {
  return (
    <div>
      {props.isVisible ? (
        <VisibilityOffIcon color="action" />
      ) : (
        <VisibilityIcon color="action" />
      )}
    </div>
  );
}
