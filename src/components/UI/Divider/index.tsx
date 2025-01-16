import { FC, ReactElement } from "react";
import "./Divider.scss";

type Props = {
  extraClass?: string;
};

const Divider: FC<Props> = ({ extraClass }): ReactElement => (
  <hr className={`divider ${extraClass ? extraClass : ""}`} />
);

export default Divider;
