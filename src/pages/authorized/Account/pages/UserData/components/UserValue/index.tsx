import { FC, ReactElement, useState } from "react";
import "./UserValue.scss";
import Button from "../../../../../../../components/UI/Button";
import FormBlock from "../FormBlock";

export type Value =
  | string
  | {
      value: string;
      allValues: Record<string, string | unknown>;
      errors: {};
    };
type Props = {
  label: string;
  editable?: boolean;
  defaultValue: Value;
  datakey: string;
};
const UserValue: FC<Props> = ({
  label,
  editable,
  defaultValue,
  datakey,
}): ReactElement => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const output = isEditing ? (
    <FormBlock
      defaultValue={defaultValue}
      label={label}
      setIsEditing={setIsEditing}
      datakey={datakey}
    />
  ) : (
    <section className="user-value__value">
      <p>
        {label}:{" "}
        {typeof defaultValue === "string" ? defaultValue : defaultValue.value}
      </p>
      {editable && <Button label="Edit" onClick={() => setIsEditing(true)} />}
    </section>
  );
  return <div className="user-value">{output}</div>;
};

export default UserValue;
