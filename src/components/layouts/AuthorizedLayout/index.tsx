import { FC, ReactElement, useCallback, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuthHook } from "../../../hooks/useAuthHook";
import "./AuthorizedLayout.scss";
import LogoutIcon from "../../icons/LogoutIcon";
import LogoIcon from "../../icons/LogoIcon";
import { AuthContext } from "../../../context/authContext";

type NavItem = {
  path: string;
  label: string;
};
const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/activation", label: "Activation" },
  { path: "/account", label: "Account" },
];

const AuthorizedLayout: FC = (): ReactElement => {
  useAuthHook();
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const signOutHandler = useCallback(() => {
    signOut();
    navigate("/sign-in");
  }, []);
  return (
    <div className="auth-layout">
      <header className="auth-layout__header">
        <NavLink to="/" className="auth-layout__header_logo">
          <LogoIcon />
        </NavLink>

        <nav className="auth-layout__header_navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li className="nav-list__item" key={item.label}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <button className="logout-btn" onClick={signOutHandler}>
            <LogoutIcon />
          </button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default AuthorizedLayout;
