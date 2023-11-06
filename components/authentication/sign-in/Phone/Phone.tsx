import {
  Button,
  StepContent,
  StepLabel,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Phone.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  phoneNumber: string;
  setPhone: Dispatch<SetStateAction<string>>;
  isEnabled: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
  isError: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  message: string | null;
  usedPhoneNumbers: string[];
  setEditMode: Dispatch<SetStateAction<boolean>>;
  index: number;
  handleStep: (step: number) => void;
};

export const Phone = ({
  phoneNumber,
  setPhone,
  isEnabled,
  setIsEnabled,
  setActiveStep,
  isError,
  setError,
  message,
  usedPhoneNumbers,
  setEditMode,
  handleStep,
  index = 0,
}: Props) => {
  const [_phoneNumber, _setPhoneNumber] = useState(phoneNumber);

  const onChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value.startsWith("+380")) return;

    const digitsOnly = value.replace(/\D/g, "");

    // Check if the input starts with '+380' and has at most 10 additional digits
    if (/^380\d{0,12}$/.test(digitsOnly)) {
      let formattedNumber = "+380";

      if (digitsOnly.length > 3) {
        formattedNumber += ` (${digitsOnly.slice(3, 5)}`;

        if (digitsOnly.length > 5) {
          formattedNumber += `) ${digitsOnly.slice(5, 8)}`;

          if (digitsOnly.length > 8) {
            formattedNumber += ` ${digitsOnly.slice(8, 10)}`;
            if (digitsOnly.length > 10) {
              formattedNumber += ` ${digitsOnly.slice(10, 12)}`;
            }
          }
        }
      }
      _setPhoneNumber(formattedNumber);

      if (digitsOnly.length > 11) setIsEnabled(true);
      else setIsEnabled(false);
    }
  };

  const handleClick = () => {
    setPhone(_phoneNumber);
    setActiveStep(1);
    setEditMode(true);
  };

  useEffect(() => {
    if (isError) setError(false);
  }, [_phoneNumber]);

  return (
    <>
      <StepLabel
        className={styles.stepper__step_label}
        error={isError || usedPhoneNumbers.includes(phoneNumber)}
        optional={
          (isError || usedPhoneNumbers.includes(phoneNumber)) && (
            <Typography variant="caption" color="error">
              {message}
            </Typography>
          )
        }
        onClick={() => handleStep(index)}
      >
        Мобільний номер телефону
      </StepLabel>
      <StepContent className={styles.stepper__step_content}>
        <div className={styles.stepper__step_content_wrapper}>
          <TextField
            label="Номер телефону (+380...)"
            variant="standard"
            className={styles.stepper__step_content_wrapper_textField}
            defaultValue={_phoneNumber}
            value={_phoneNumber}
            onChange={onChangePhoneNumber}
          />
          <div>
            <Button
              variant="contained"
              disabled={
                !isEnabled || isError || usedPhoneNumbers.includes(_phoneNumber)
              }
              onClick={handleClick}
            >
              Далі
            </Button>
          </div>
        </div>
      </StepContent>
    </>
  );
};

export default Phone;
