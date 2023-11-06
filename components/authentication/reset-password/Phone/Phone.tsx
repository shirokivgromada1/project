import {
  Button,
  Step,
  StepContent,
  StepLabel,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Phone.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { COOL_DOWN_TIME } from "@/pages/sign-up";

type Props = {
  isEnabled: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
  isActiveTimer?: boolean;
  setActiveTimer?: Dispatch<SetStateAction<boolean>>;
  time?: number;
  setTime?: Dispatch<SetStateAction<number>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
};

export const Phone = ({
  isEnabled,
  setIsEnabled,
  isActiveTimer,
  setActiveTimer,
  time,
  setTime,
  setActiveStep,
  setEditMode,
  phoneNumber,
  setPhoneNumber,
}: Props) => {
  const { onChangeUserId } = useAuth();
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const [usedPhoneNumbers, setUsedPhoneNumbers] = useState<string[]>([]);

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);

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
      setPhoneNumber(formattedNumber);

      if (digitsOnly.length > 11) setIsEnabled(true);
      else setIsEnabled(false);
    }
  };

  useEffect(() => {
    if (isError) setError(false);
  }, [phoneNumber]);

  const handleClick = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.VERIFY_PHONE}/`,
        {
          phoneNumber,
        }
      )
      .then(function (response) {
        setTime && setTime(COOL_DOWN_TIME);
        setActiveTimer && setActiveTimer(true);
        setIsEnabled(false);
        setActiveStep(1);
        setEditMode(true);
        setError(false);
        const { userId, message } = response.data;
        onChangeUserId(userId);
        setPhoneNumbers([...phoneNumbers, phoneNumber]);
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(function (error) {
        setError(true);
        setMessage(error.response.data.message);
        setUsedPhoneNumbers([...usedPhoneNumbers, phoneNumber]);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleStep = () => {
    if (phoneNumber) setActiveStep(0);
    setEditMode(false);
  };

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
        onClick={handleStep}
      >
        Мобільний номер телефону
      </StepLabel>
      <StepContent className={styles.stepper__step_content}>
        <div className={styles.stepper__step_content_wrapper}>
          <TextField
            label="Номер телефону (+380...)"
            variant="standard"
            className={styles.stepper__step_content_wrapper_textField}
            defaultValue={phoneNumber}
            value={phoneNumber}
            onChange={onChangePhoneNumber}
          />
          <div>
            <Button
              variant="contained"
              disabled={
                !isEnabled ||
                (phoneNumbers.includes(phoneNumber) && isActiveTimer)
              }
              onClick={handleClick}
            >
              Відправити код підтвердження
            </Button>
            {phoneNumbers.includes(phoneNumber) && isActiveTimer && (
              <div
                className={styles.stepper__step_content_wrapper_button_timer}
              >
                <span>{time}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                >
                  <path
                    d="M6.5 2.84375C5.38748 2.84375 4.29995 3.17365 3.37492 3.79173C2.44989 4.40982 1.72892 5.28832 1.30318 6.31616C0.877437 7.34399 0.766043 8.47499 0.983085 9.56613C1.20013 10.6573 1.73586 11.6596 2.52253 12.4462C3.3092 13.2329 4.31148 13.7686 5.40262 13.9857C6.49376 14.2027 7.62476 14.0913 8.6526 13.6656C9.68043 13.2398 10.5589 12.5189 11.177 11.5938C11.7951 10.6688 12.125 9.58127 12.125 8.46875C12.1233 6.97743 11.5301 5.54768 10.4756 4.49316C9.42107 3.43864 7.99132 2.84546 6.5 2.84375ZM6.5 13.1562C5.5729 13.1562 4.66662 12.8813 3.89577 12.3663C3.12491 11.8512 2.5241 11.1191 2.16932 10.2626C1.81453 9.40605 1.7217 8.46355 1.90257 7.55426C2.08344 6.64498 2.52988 5.80975 3.18544 5.15419C3.841 4.49863 4.67623 4.05219 5.58552 3.87132C6.4948 3.69045 7.4373 3.78328 8.29383 4.13806C9.15036 4.49285 9.88245 5.09366 10.3975 5.86451C10.9126 6.63537 11.1875 7.54165 11.1875 8.46875C11.1861 9.71152 10.6918 10.903 9.81302 11.7818C8.93425 12.6605 7.74278 13.1549 6.5 13.1562ZM9.17539 5.79336C9.21898 5.83689 9.25355 5.88859 9.27714 5.9455C9.30073 6.0024 9.31287 6.0634 9.31287 6.125C9.31287 6.1866 9.30073 6.2476 9.27714 6.3045C9.25355 6.36141 9.21898 6.41311 9.17539 6.45664L6.83164 8.80039C6.78809 8.84394 6.73639 8.87849 6.67949 8.90206C6.62258 8.92563 6.56159 8.93776 6.5 8.93776C6.43841 8.93776 6.37742 8.92563 6.32052 8.90206C6.26362 8.87849 6.21191 8.84394 6.16836 8.80039C6.12481 8.75684 6.09026 8.70514 6.06669 8.64823C6.04312 8.59133 6.03099 8.53034 6.03099 8.46875C6.03099 8.40716 6.04312 8.34617 6.06669 8.28927C6.09026 8.23236 6.12481 8.18066 6.16836 8.13711L8.51211 5.79336C8.55565 5.74978 8.60734 5.7152 8.66425 5.69161C8.72115 5.66802 8.78215 5.65588 8.84375 5.65588C8.90535 5.65588 8.96635 5.66802 9.02326 5.69161C9.08016 5.7152 9.13186 5.74978 9.17539 5.79336ZM4.625 1.4375C4.625 1.31318 4.67439 1.19395 4.7623 1.10604C4.8502 1.01814 4.96943 0.96875 5.09375 0.96875H7.90625C8.03057 0.96875 8.1498 1.01814 8.23771 1.10604C8.32562 1.19395 8.375 1.31318 8.375 1.4375C8.375 1.56182 8.32562 1.68105 8.23771 1.76896C8.1498 1.85686 8.03057 1.90625 7.90625 1.90625H5.09375C4.96943 1.90625 4.8502 1.85686 4.7623 1.76896C4.67439 1.68105 4.625 1.56182 4.625 1.4375Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </StepContent>
    </>
  );
};

export default Phone;
