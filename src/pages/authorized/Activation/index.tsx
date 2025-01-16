import { FC, ReactElement } from "react";
import "./Activation.scss";
import ActivationImage from "../../../assets/images/activation.jpg";

const Activation: FC = (): ReactElement => (
  <div className="activation">
    <h1 className="activation__title">Activation Page</h1>
    <img src={ActivationImage} alt="Welcome" className="activation__image" />
  </div>
);

export default Activation;
