import { Button, StepContent, StepLabel, TextField } from "@mui/material";
import styles from "./Fullname.module.scss";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  isEnabled: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
};

const Fullname = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  isEnabled,
  setActiveStep,
  setIsEnabled,
}: Props) => {
  const handleClick = () => {
    setActiveStep(4);
    setIsEnabled(false);
  };

  useEffect(() => {
    if (firstName && lastName) setIsEnabled(true);
    else setIsEnabled(false);
  }, [firstName, lastName]);

  const handleStep = () => {
    if (firstName || lastName) setActiveStep(3);
  };

  return (
    <>
      <StepLabel className={styles.stepper__step_label} onClick={handleStep}>
        Ім'я та прізвище
      </StepLabel>
      <StepContent className={styles.stepper__step_content}>
        <div className={styles.stepper__step_content_wrapper}>
          <div className={styles.stepper__step_content_wrapper_flex}>
            <div className={styles.stepper__step_content_wrapper_flex_input}>
              <TextField
                hiddenLabel
                variant="outlined"
                required
                placeholder="Введіть ваше ім'я"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.success}
                color="success"
              />
            </div>
            <div className={styles.stepper__step_content_wrapper_flex_input}>
              <TextField
                hiddenLabel
                variant="outlined"
                required
                className={styles.success}
                placeholder="Введіть ваше прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                color="success"
              />
            </div>
          </div>
          <Button
            variant="contained"
            disabled={firstName && lastName ? false : !isEnabled}
            onClick={handleClick}
          >
            Підтвердити
          </Button>
        </div>
      </StepContent>
    </>
  );
};

export default Fullname;
