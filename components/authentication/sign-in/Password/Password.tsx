import {
  Button,
  IconButton,
  InputAdornment,
  StepContent,
  StepLabel,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Password.module.scss";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import axios from "axios";
import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/interceptors/axios";

type Props = {
  phoneNumber: string;
  password: string;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setPassword: Dispatch<SetStateAction<string>>;
  usedPhoneNumbers: string[];
  setUsedPhoneNumbers: Dispatch<SetStateAction<string[]>>;
  setPhoneError: Dispatch<SetStateAction<boolean>>;
  setPhoneMessage: Dispatch<SetStateAction<null | string>>;
  index: number;
  activeStep: number;
  handleStep: (step: number) => void;
};

const Password = ({
  phoneNumber,
  setActiveStep,
  password,
  setPassword,
  usedPhoneNumbers,
  setUsedPhoneNumbers,
  setPhoneError,
  setPhoneMessage,
  index,
  handleStep,
  activeStep,
}: Props) => {
  const router = useRouter();

  const [_password, _setPassword] = useState(password);
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setError] = useState(false);

  const { onChangeAuth } = useAuth();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    _setPassword(value);
  };

  const handleClick = () => {
    setPassword(_password);
    axiosInstance
      .post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.SIGN_IN}/`,
        {
          phoneNumber,
          password: _password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        const { refresh, access } = response.data;
        setActiveStep(2);
        toast.success("Авторизація виконана успішно", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onChangeAuth(true);

        localStorage.clear();
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        router.push("/dashboard");
      })
      .catch((err) => {
        let message;
        if (err.response.status === 401) {
          message = err.response.data.detail;
        }
        if (err.response.status === 500) {
          setPhoneError(true);
          !usedPhoneNumbers.includes(phoneNumber) &&
            setUsedPhoneNumbers([...usedPhoneNumbers, phoneNumber]);
          setActiveStep(0);
          message = "Проблеми з сервером";
          setPhoneMessage(message);
        }
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
    if (isError) setError(false);
  }, [_password]);

  return (
    <>
      <StepLabel
        className={styles.stepper__step_label}
        onClick={() => handleStep(index)}
        style={{ cursor: index < activeStep ? "pointer" : "default" }}
      >
        Пароль
      </StepLabel>
      <StepContent className={styles.stepper__step_content}>
        <div className={styles.stepper__step_content_wrapper}>
          <div className={styles.stepper__step_content_wrapper_flex}>
            <div className={styles.stepper__step_content_wrapper_flex_input}>
              <TextField
                hiddenLabel
                variant="outlined"
                required
                placeholder="Введіть пароль"
                value={_password}
                onChange={onChange}
                className={
                  !Boolean(_password) || (_password.length >= 8 && !isError)
                    ? styles.success
                    : styles.error
                }
                color="success"
                error={(Boolean(_password) && _password.length < 8) || isError}
                type={!_password ? "text" : showPassword ? "text" : "password"}
              />
              {_password && (
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
          </div>
          <Button
            variant="contained"
            disabled={
              !Boolean(_password) ||
              (Boolean(_password) && _password.length < 8) ||
              isError
            }
            onClick={handleClick}
          >
            Увійти
          </Button>
        </div>
      </StepContent>
    </>
  );
};

export default Password;
