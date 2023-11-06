import { Button as MaterialButton, Tooltip, Zoom } from "@mui/material";
import styles from "./Button.module.scss";

type Props = {
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  toolTip?: string;
};

const Button = ({
  type,
  children,
  onClick,
  disabled,
  toolTip,
  ...props
}: Props) => {
  return (
    <Tooltip title={toolTip} TransitionComponent={Zoom} followCursor>
      <span>
        <MaterialButton
          className={styles.button}
          type={type}
          onClick={onClick}
          disabled={disabled}
          {...props}
        >
          {children}
        </MaterialButton>
      </span>
    </Tooltip>
  );
};

export default Button;
