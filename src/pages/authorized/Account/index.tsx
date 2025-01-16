import { FC, ReactElement } from "react";
import "./Account.scss";
import Search from "./components/Search";
import Divider from "../../../components/UI/Divider";
import { Outlet } from "react-router";

const Account: FC = (): ReactElement => (
  <div className="account">
    <Search />
    <Divider />

    <div className="account__user-data">
      <Outlet />
    </div>
  </div>
);

export default Account;
