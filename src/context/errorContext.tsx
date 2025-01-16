import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from "react";

type ErrorProvider = {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};
export const ErrorContext = createContext<ErrorProvider>({
  errorMessage: "",
  setErrorMessage: () => {},
});

type Props = {
  children: ReactNode;
};
const ErrorContextProvider: FC<Props> = ({ children }): ReactElement => {
  const [errorMessage, setErrorMessage] = useState("");
  const values = useMemo(
    () => ({ errorMessage, setErrorMessage }),
    [errorMessage]
  );
  return (
    <ErrorContext.Provider value={values}>{children}</ErrorContext.Provider>
  );
};
export default ErrorContextProvider;
