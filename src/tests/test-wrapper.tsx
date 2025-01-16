import { ReactElement, ReactNode } from "react";
import { BrowserRouter } from "react-router";
import AuthContextProvider from "../context/authContext";
import ErrorContextProvider from "../context/errorContext";
import UsersContextProvider from "../context/usersContext";

type Props = {
  children: ReactNode;
};
export const Wrapper = ({ children }: Props): ReactElement => (
  <BrowserRouter>
    <ErrorContextProvider>
      <AuthContextProvider>
        <UsersContextProvider>{children}</UsersContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </BrowserRouter>
);
