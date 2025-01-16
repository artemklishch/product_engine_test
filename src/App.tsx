import React from "react";
import { Routes, Route, Navigate } from "react-router";
import UnauthorizedLayout from "./components/layouts/UnauthorizedLayout";
import AuthorizedLayout from "./components/layouts/AuthorizedLayout";
import Home from "./pages/authorized/Home";
import SignIn from "./pages/unauthorized/SignIn";
import Activation from "./pages/authorized/Activation";
import Account from "./pages/authorized/Account";
import "./App.scss";
import UserData from "./pages/authorized/Account/pages/UserData";

const App: React.FC = () => {
  return (
    <main className="app">
      <Routes>
        {/* Unauthorized */}
        <Route path="/" element={<UnauthorizedLayout />}>
          <Route index path="sign-in" element={<SignIn />} />
        </Route>

        {/* Authorized */}
        <Route path="/" element={<AuthorizedLayout />}>
          <Route index element={<Home />} />
          <Route path="/activation" element={<Activation />} />
          <Route path="/account" element={<Account />}>
            <Route path=":userId" element={<UserData />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

export default App;
