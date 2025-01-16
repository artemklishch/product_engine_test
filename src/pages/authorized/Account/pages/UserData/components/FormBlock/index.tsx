import React, {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Value } from "../UserValue";
import InputField from "../../../../../../../components/UI/InputField";
import "./FormBlock.scss";
import ActionButtons from "./ActionButtons";
import { lengthValidate } from "../../../../../../../utils/validations";
import { deepClone, updateObject } from "../../../../../../../utils/objects";
import { UsersContext } from "../../../../../../../context/usersContext";
import { UserData } from "../../../../../../../context/authTypes";
import { ErrorContext } from "../../../../../../../context/errorContext";

const fieldLengthValidation = lengthValidate(3, 255);

type Props = {
  defaultValue: Value;
  label: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  datakey: string;
};

const FormBlock: FC<Props> = ({
  defaultValue,
  label,
  setIsEditing,
  datakey,
}): ReactElement => {
  const { updateUserData, userData } = useContext(UsersContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const [editingValue, setEditingValue] = useState<Value>(
    typeof defaultValue === "string" ? defaultValue : deepClone(defaultValue)
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof editingValue === "object") {
      const updatedValues = { ...editingValue };
      updatedValues.allValues[e.target.name] = e.target.value;
      setEditingValue(updatedValues);
    } else {
      setEditingValue(e.target.value);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) {
      return;
    }
    const updatedValues =
      typeof editingValue === "object" ? editingValue.allValues : editingValue;
    const updatedUserData = updateObject(userData, datakey, updatedValues);
    const response = await updateUserData(updatedUserData as UserData);
    if ("error" in response) {
      setErrorMessage(response.error);
      return;
    } else {
      setIsEditing(false);
    }
  };

  const onCancel = () => {
    setEditingValue(defaultValue);
    setIsEditing(false);
  };

  if (typeof editingValue === "object") {
    let error = false;
    return (
      <form className="form-block" onSubmit={onSubmit}>
        {Object.entries(editingValue.allValues).map((values) => {
          if (typeof values[1] === "string") {
            const isError = fieldLengthValidation(values[1]);
            if (isError && !error) {
              error = true;
            }
            return (
              <InputField
                value={values[1]}
                label={values[0]}
                onChange={onChange}
                key={values[0]}
                name={values[0]}
                error={isError}
              />
            );
          } else return null;
        })}
        <ActionButtons onCancel={onCancel} isError={error} />
      </form>
    );
  }
  const isError = fieldLengthValidation(editingValue);
  return (
    <form className="form-block" onSubmit={onSubmit}>
      <InputField
        value={editingValue}
        label={label}
        onChange={onChange}
        error={isError}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ActionButtons onCancel={onCancel} isError={isError} />
    </form>
  );
};

export default FormBlock;
