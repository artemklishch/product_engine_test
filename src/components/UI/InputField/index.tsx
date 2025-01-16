import { ChangeEvent, FC, ReactElement } from "react";
import "./InputField.scss";

type Props = {
  label: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: false | string;
  iconButton?: ReactElement;
  autoComplete?: string;
  name?: string;
};

const InputField: FC<Props> = ({
  label,
  type,
  onChange,
  value,
  error,
  autoComplete = "new-password",
  iconButton,
  name,
}): ReactElement => (
  <label className="input-field">
    <h6>{label}</h6>
    <div className="input-field__wrapper-field">
      <input
        type={type}
        className="input-field__wrapper-field_field"
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        name={name}
      />
      {iconButton && iconButton}
    </div>
    {error && <span className="error-message">{error}</span>}
  </label>
);

export default InputField;
