import { FC, ReactElement } from "react";
import { Outlet } from "react-router";
import "./UnauthorizedLayout.scss";

const UnauthorizedLayout: FC = (): ReactElement => {
  return (
    <div className="unauthorized-layout">
      <Outlet />
    </div>
  );
};

export default UnauthorizedLayout;
