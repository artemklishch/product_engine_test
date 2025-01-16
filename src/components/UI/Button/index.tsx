import { FC, ReactElement } from "react";
import "./Button.scss";

type Props = {
  label: string | ReactElement;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  extraClass?: string;
};

const Button: FC<Props> = ({
  label,
  type = "button",
  disabled,
  onClick,
  extraClass,
}): ReactElement => (
  <button
    className={`button ${extraClass ? extraClass : ""}`}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
