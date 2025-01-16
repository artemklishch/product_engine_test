import { FC, FormEvent, ReactElement, useContext, useReducer } from "react";
import "./SignIn.scss";
import { ErrorContext } from "../../../context/errorContext";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router";
import Fields from "./components/Fields";
import {
  initialValues,
  passwordLengthValidation,
  reducer,
  usernameLengthValidation,
} from "./helpers/reducer";
import Button from "../../../components/UI/Button";

const SignIn: FC = (): ReactElement => {
  const [formData, dispatch] = useReducer(reducer, initialValues);
  const { signIn } = useContext(AuthContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const navigate = useNavigate();
  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = formData.username.value;
    const password = formData.password.value;
    const response = await signIn(username, password);
    if ("error" in response) {
      setErrorMessage(response.error);
      return;
    } else {
      navigate("/");
    }
  };
  const isFormValid =
    !!formData.username.error ||
    !!formData.username.error ||
    !!usernameLengthValidation(formData.username.value) ||
    !!passwordLengthValidation(formData.password.value);
  return (
    <div className="sign-in">
      <h1 className="sign-in__title">Sign In please</h1>
      <form
        onSubmit={signInHandler}
        className="sign-in__form"
        onChange={() => setErrorMessage("")}
      >
        <Fields formData={formData} dispatch={dispatch} />
        <section className="sign-in__form_action">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Button
            testId="sign-in-button-testid"
            label="Sign In"
            type="submit"
            disabled={isFormValid}
          />
        </section>
      </form>
    </div>
  );
};

export default SignIn;
