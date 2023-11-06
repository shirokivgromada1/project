import { Dispatch, SetStateAction } from "react";
import styles from "./BackStep.module.scss";

type Props = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
};

const BackStep = ({
  activeStep,
  setActiveStep,
  setIsEnabled,
  setEditMode,
}: Props) => {
  return (
    <button
      type="button"
      className={styles.stepBack}
      onClick={() => {
        if (setEditMode) {
          activeStep === 1 ? setEditMode(false) : setEditMode(true);
        }
        setActiveStep((prev) => prev - 1);
        setIsEnabled(true);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M11.6667 5.83335L7.5 10L11.6667 14.1667"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackStep;
