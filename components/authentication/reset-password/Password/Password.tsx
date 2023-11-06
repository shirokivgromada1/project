import {
  Button,
  IconButton,
  InputAdornment,
  StepContent,
  StepLabel,
  TextField,
} from "@mui/material";
import styles from "./Password.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import AnimateHeight from "react-animate-height";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type Props = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  isEnabled: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

const Password = ({
  password,
  setPassword,
  isEnabled,
  setIsEnabled,
  setActiveStep,
}: Props) => {
  const router = useRouter();
  const [validPassList, setValidPassList] = useState({
    len: false,
    alpha: false,
    digit: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userId } = useAuth();

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const validList = {
      len: false,
      alpha: false,
      digit: false,
    };

    if (value.length >= 8) validList.len = true;
    if (/[a-zA-Z]+/.test(value)) validList.alpha = true;
    if (/\d/.test(value)) validList.digit = true;

    setValidPassList(validList);
    setPassword(value);
  };

  const onChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const handleClick = () => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.RESET_PASSWORD}/`,
        {
          userId,
          password,
        }
      )
      .then((response) => {
        setActiveStep(3);
        setIsEnabled(false);
        const { message } = response.data;

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
        router.push("/sign-in");
      })
      .catch((err) => {
        const { message } = err.response.data;

        toast.error(message, {
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

  useEffect(() => {
    if (
      validPassList.alpha &&
      validPassList.digit &&
      validPassList.len &&
      password === confirmPassword
    )
      setIsEnabled(true);
    else setIsEnabled(false);
  }, [validPassList, password, confirmPassword]);

  const handleStep = () => {
    if (password || confirmPassword) setActiveStep(2);
  };

  return (
    <>
      <StepLabel className={styles.stepper__step_label} onClick={handleStep}>
        Пароль
      </StepLabel>
      <StepContent className={styles.stepper__step_content}>
        <div className={styles.stepper__step_content_wrapper}>
          <div className={styles.stepper__step_content_wrapper_flex}>
            <div className={styles.stepper__step_content_wrapper_flex_label}>
              <label>Ваш новий пароль:</label>
            </div>
            <div className={styles.stepper__step_content_wrapper_flex_input}>
              <TextField
                hiddenLabel
                variant="outlined"
                required
                placeholder="Введіть пароль"
                value={password}
                onChange={onChangePassword}
                className={
                  Boolean(password) &&
                  (!validPassList.len ||
                    !validPassList.alpha ||
                    !validPassList.digit)
                    ? styles.error
                    : styles.success
                }
                color="success"
                error={
                  Boolean(password) &&
                  (!validPassList.len ||
                    !validPassList.alpha ||
                    !validPassList.digit)
                }
                type={!password ? "text" : showPassword ? "text" : "password"}
              />
              {password && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                      event.preventDefault()
                    }
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              )}
            </div>
            <AnimateHeight duration={500} height={password ? "auto" : 0}>
              <div
                className={
                  styles.stepper__step_content_wrapper_flex_validationContainer
                }
              >
                <div>
                  <span>Мінімум вісім символів </span>
                  {validPassList.len && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M3.25 7.04166L5.525 8.99166L9.75 3.79166"
                        stroke="#309C54"
                        stroke-linecap="round"
                      />
                    </svg>
                  )}
                  {!validPassList.len && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                    >
                      <path
                        d="M3.09766 7.90304L5.5007 5.5L7.90374 7.90304M7.90374 3.09695L5.50024 5.5L3.09766 3.09695"
                        stroke="#F33A3A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <span>Хоча б одна літера</span>
                  {validPassList.alpha && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M3.25 7.04166L5.525 8.99166L9.75 3.79166"
                        stroke="#309C54"
                        stroke-linecap="round"
                      />
                    </svg>
                  )}
                  {!validPassList.alpha && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                    >
                      <path
                        d="M3.09766 7.90304L5.5007 5.5L7.90374 7.90304M7.90374 3.09695L5.50024 5.5L3.09766 3.09695"
                        stroke="#F33A3A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <span>Хоча б одна цифра</span>
                  {validPassList.digit && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M3.25 7.04166L5.525 8.99166L9.75 3.79166"
                        stroke="#309C54"
                        stroke-linecap="round"
                      />
                    </svg>
                  )}
                  {!validPassList.digit && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                    >
                      <path
                        d="M3.09766 7.90304L5.5007 5.5L7.90374 7.90304M7.90374 3.09695L5.50024 5.5L3.09766 3.09695"
                        stroke="#F33A3A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </AnimateHeight>

            <div className={styles.stepper__step_content_wrapper_flex_label}>
              <label>Підтвердження пароля</label>
            </div>
            <div className={styles.stepper__step_content_wrapper_flex_input}>
              <TextField
                hiddenLabel
                variant="outlined"
                required
                error={Boolean(confirmPassword) && confirmPassword !== password}
                className={
                  Boolean(confirmPassword) && confirmPassword !== password
                    ? styles.error
                    : styles.success
                }
                placeholder="Підтвердити пароль"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                color="success"
                type={
                  !confirmPassword
                    ? "text"
                    : showConfirmPassword
                    ? "text"
                    : "password"
                }
              />
              {confirmPassword && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                      event.preventDefault()
                    }
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )}
            </div>
            <AnimateHeight duration={500} height={confirmPassword ? "auto" : 0}>
              <div
                className={
                  styles.stepper__step_content_wrapper_flex_validationContainer
                }
                style={{ marginBottom: 0 }}
              >
                <div>
                  <span style={{ width: 148 }}>Ваші паролі співпадають</span>
                  {confirmPassword === password && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M3.25 7.04166L5.525 8.99166L9.75 3.79166"
                        stroke="#309C54"
                        stroke-linecap="round"
                      />
                    </svg>
                  )}
                  {confirmPassword !== password && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                    >
                      <path
                        d="M3.09766 7.90304L5.5007 5.5L7.90374 7.90304M7.90374 3.09695L5.50024 5.5L3.09766 3.09695"
                        stroke="#F33A3A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </AnimateHeight>
          </div>
          <Button
            variant="contained"
            disabled={!isEnabled}
            onClick={handleClick}
          >
            Змінити
          </Button>
        </div>
      </StepContent>
    </>
  );
};

export default Password;
