import Footer from "@/components/layout/Footer/Footer";
import client from "@/tina/__generated__/client";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useRef, useState } from "react";
import { useTina } from "tinacms/dist/react";
import styles from "./SignUp.module.scss";
import { AsyncReturnType } from "../[filename]";
import Image from "next/image";
import Link from "next/link";
import { Button, Checkbox, Step, Stepper } from "@mui/material";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import BackStep from "@/components/authentication/sign-up/BackStep/BackStep";
import Phone from "@/components/authentication/sign-up/Phone/Phone";
import Code from "@/components/authentication/sign-up/Code/Code";
import Password from "@/components/authentication/sign-up/Password/Password";
import Fullname from "@/components/authentication/sign-up/Fullname/Fullname";
import Locality from "@/components/authentication/sign-up/Locality/Locality";
import Status from "@/components/authentication/sign-up/Status/Status";

export const COOL_DOWN_TIME = 60 * 10;

const SignUp = (props: AsyncReturnType<typeof getServerSideProps>["props"]) => {
  const router = useRouter();
  const { data } = useTina(props);

  const timer = useRef(null) as any;
  const logo = data.global.footer?.logo;

  const { userId } = useAuth();
  const [activeStep, setActiveStep] = useState(0);

  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState<undefined | any>(undefined);
  const [status, setStatus] = useState<undefined | any>(undefined);

  const [isActiveTimer, setActiveTimer] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const [time, setTime] = useState(COOL_DOWN_TIME);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isActiveTimer && timer) {
      timer.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer.current);
    }
  }, [isActiveTimer]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timer.current);
      setActiveTimer(false);
      return;
    }
  }, [time, timer]);

  const signUp = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.SIGN_UP}/`,
        {
          userId,
          password,
          firstName,
          lastName,
          location: location?.value,
          status: status?.value,
        }
      )
      .then((response) => {
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

  return (
    <div className={styles.authWrapper}>
      {logo && (
        <div className={styles.authWrapper__header}>
          <Link href={"/"}>
            <a>
              <Image src={logo} alt="logo" width={179} height={96} />
            </a>
          </Link>
        </div>
      )}
      <div className={styles.authWrapper__modal}>
        <div className={styles.authWrapper__modal_absolute}>
          <div className={styles.authWrapper__modal_absolute_container}>
            {activeStep > 0 && (
              <BackStep
                setActiveStep={setActiveStep}
                setIsEnabled={setIsEnabled}
                setEditMode={setEditMode}
                activeStep={activeStep}
              />
            )}
            <h1>Реєстрація</h1>
            <div
              className={styles.authWrapper__modal_absolute_container_stepper}
            >
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                className={styles.stepper}
              >
                <Step key={"phoneNumber"} className={styles.stepper__step}>
                  <Phone
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                    isActiveTimer={isActiveTimer}
                    setActiveTimer={setActiveTimer}
                    time={time}
                    setTime={setTime}
                    setActiveStep={setActiveStep}
                    setEditMode={setEditMode}
                  />
                </Step>
                <Step key={"code"} className={styles.stepper__step}>
                  <Code
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                    time={time}
                    isActiveTimer={isActiveTimer}
                    setTime={setTime}
                    setActiveTimer={setActiveTimer}
                    setActiveStep={setActiveStep}
                    setEditMode={setEditMode}
                  />
                </Step>
                <Step key={"password"} className={styles.stepper__step}>
                  <Password
                    password={password}
                    setPassword={setPassword}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                    setActiveStep={setActiveStep}
                  />
                </Step>
                <Step key={"fullName"} className={styles.stepper__step}>
                  <Fullname
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    isEnabled={isEnabled}
                    setActiveStep={setActiveStep}
                    setIsEnabled={setIsEnabled}
                  />
                </Step>
                <Step key={"locality"} className={styles.stepper__step}>
                  <Locality
                    location={location}
                    setLocation={setLocation}
                    isEnabled={isEnabled}
                    setActiveStep={setActiveStep}
                    setIsEnabled={setIsEnabled}
                  />
                </Step>
                <Step key={"status"} className={styles.stepper__step}>
                  <Status
                    status={status}
                    setStatus={setStatus}
                    isEnabled={isEnabled}
                    setActiveStep={setActiveStep}
                    setIsEnabled={setIsEnabled}
                    setEditMode={setEditMode}
                  />
                </Step>
              </Stepper>
              {!isEditMode &&
                password &&
                firstName &&
                lastName &&
                location &&
                status && (
                  <div className={styles.agreement}>
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={<BsSquare />}
                      checkedIcon={<BsCheckSquare />}
                    />
                    <Link
                      href={
                        "https://docs.google.com/document/d/1NBc9K71DWjfGAbg9_DIYgZ-kOR5u7Qqu-R5eRUadslo/edit"
                      }
                    >
                      <a>
                        <span>Згоден/на на обробку персональних даних</span>
                      </a>
                    </Link>
                  </div>
                )}
              {!isEditMode &&
                password &&
                firstName &&
                lastName &&
                location &&
                status && (
                  <div className={styles.registerContainer}>
                    <Button
                      variant="contained"
                      disabled={!checked}
                      onClick={signUp}
                    >
                      зареєструватися
                    </Button>
                  </div>
                )}
            </div>
          </div>
          {!isEditMode &&
            !password &&
            !firstName &&
            !lastName &&
            !location &&
            !status && (
              <div className={styles.authWrapper__modal_absolute_links}>
                <Link href={"/sign-in"}>
                  <a>Авторизація</a>
                </Link>
                <Link href={"/reset-password"}>
                  <a>Забули пароль?</a>
                </Link>
              </div>
            )}
        </div>
      </div>
      <Footer data={data.global.footer} />
    </div>
  );
};

export default SignUp;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `home.md`,
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
  };
  return {
    props: JSON.parse(JSON.stringify(props)) as typeof props,
  };
};
