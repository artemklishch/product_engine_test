import { ChangeEvent, FC, ReactElement, useState } from "react";
import CrossedEyeIcon from "../../../../components/icons/CrossedEyeIcon";
import EyeIcon from "../../../../components/icons/EyeIcon";
import {
  PASSWORD_ACTION,
  ReducerAction,
  ReducerState,
  USERNAME_ACTION,
} from "../helpers/reducer";
import InputField from "../../../../components/UI/InputField";
import Button from "../../../../components/UI/Button";

type Props = {
  formData: ReducerState;
  dispatch: React.ActionDispatch<[action: ReducerAction]>;
};
const Fields: FC<Props> = ({ formData, dispatch }): ReactElement => {
  const [isText, setIsText] = useState<boolean>(false);
  const showHidePassword = () => setIsText(!isText);

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: USERNAME_ACTION, payload: e.target.value });
  };

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: PASSWORD_ACTION, payload: e.target.value });
  };
  return (
    <>
      <InputField
        onChange={usernameChange}
        value={formData.username.value}
        label="Username*"
        error={formData.username.error}
        testId="signin-username-testid"
      />
      <InputField
        onChange={passwordChange}
        value={formData.password.value}
        label="Password*"
        error={formData.password.error}
        type={isText ? "text" : "password"}
        iconButton={
          <Button
            label={isText ? <CrossedEyeIcon /> : <EyeIcon />}
            onClick={showHidePassword}
            extraClass="password-field__btn"
          />
        }
        testId="signin-password-testid"
      />
    </>
  );
};

export default Fields;
