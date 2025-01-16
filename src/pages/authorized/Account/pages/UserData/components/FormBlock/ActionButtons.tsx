import { FC, ReactElement } from "react";
import Button from "../../../../../../../components/UI/Button";
import "./FormBlock.scss";

type Props = {
  onCancel: () => void;
  isError: string | false;
};

const ActionButtons: FC<Props> = ({ onCancel, isError }): ReactElement => (
  <div className="action-buttons">
    <Button type="submit" label="Save" disabled={!!isError} />
    <Button label="Cancel" onClick={onCancel} />
  </div>
);

export default ActionButtons;
