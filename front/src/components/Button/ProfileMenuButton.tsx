import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ProfileMenuButton(props: {
  to: string;
  text: string;
  iconElement?: JSX.Element;
}) {
  return (
    <Link to={props.to} className="group">
      <div className="flex items-center justify-between w-full p-4 my-5 border rounded-md group-hover:border-primary">
        <div className="flex items-center">
          {props.iconElement && (
            <div className="flex mr-2 text-disabled group-hover:text-primary">
              {props.iconElement}
            </div>
          )}
          <span>{props.text}</span>
        </div>
        <ArrowForwardIos fontSize="small" color="disabled" />
      </div>
    </Link>
  );
}
