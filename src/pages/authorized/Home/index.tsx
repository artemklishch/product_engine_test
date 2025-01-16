import { FC, ReactElement } from "react";
import Welcome from "../../../assets/images/welcome.jpg";
import "./Home.scss";

const Home: FC = (): ReactElement => (
  <div className="home">
    <h1 className="home__title">Welcome to the Home Page</h1>
    <img src={Welcome} alt="Welcome" className="home__image" />
  </div>
);

export default Home;
