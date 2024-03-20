import { MouseEvent } from "react";
import ButtonAsset from "../Button/ButtonAsset";
import InputAsset from "./InputAsset";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  labelVisible?: boolean;
  buttonText?: string;
  buttonVisible?: boolean;
  error?: Error;
  buttonClickHandler?: (event: MouseEvent) => void;
}

export default function TextField({
  label,
  placeholder,
  labelVisible = true,
  buttonText = "",
  buttonVisible = false,
  error,
  buttonClickHandler,
}: TextFieldProps) {
  return (
    <div className="relative">
      {/* Lable */}
      {labelVisible && (
        <label className="inline-block pb-1 font-bold">{label}</label>
      )}
      {/* Input & Button */}
      <div className="flex w-full">
        <InputAsset placeholder={placeholder} />
        {/* TODO: 버튼을 없앨지 고민 중입니다. */}
        {buttonVisible && (
          <ButtonAsset
            text={buttonText}
            size="sm"
            className="ml-2"
            onClick={buttonClickHandler}
          />
        )}
      </div>
      {/* Error Message */}
      {error && <p className="inline-block text-xs">{error.message}</p>}
    </div>
  );
}
