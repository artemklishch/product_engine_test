import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.scss";
import AuthContextProvider from "./context/authContext";
import ErrorContextProvider from "./context/errorContext";
import UsersContextProvider from "./context/usersContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <ErrorContextProvider>
        <AuthContextProvider>
          <UsersContextProvider>
            <App />
          </UsersContextProvider>
        </AuthContextProvider>
      </ErrorContextProvider>
    </BrowserRouter>
  );
}
