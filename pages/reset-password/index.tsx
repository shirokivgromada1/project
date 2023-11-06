import Footer from "@/components/layout/Footer/Footer";
import client from "@/tina/__generated__/client";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useRef, useState } from "react";
import { useTina } from "tinacms/dist/react";
import styles from "./ResetPassword.module.scss";
import { AsyncReturnType } from "../[filename]";
import Image from "next/image";
import Link from "next/link";
import { Step, Stepper } from "@mui/material";
import BackStep from "@/components/authentication/reset-password/BackStep/BackStep";
import Phone from "@/components/authentication/reset-password/Phone/Phone";
import Code from "@/components/authentication/reset-password/Code/Code";
import Password from "@/components/authentication/reset-password/Password/Password";
import { COOL_DOWN_TIME } from "../sign-up";

const ResetPassword = (
  props: AsyncReturnType<typeof getServerSideProps>["props"]
) => {
  const { data } = useTina(props);

  const timer = useRef(null) as any;
  const logo = data.global.footer?.logo;

  const [activeStep, setActiveStep] = useState(0);

  const [phoneNumber, setPhoneNumber] = useState("+380");
  const [password, setPassword] = useState("");

  const [isActiveTimer, setActiveTimer] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);

  const [time, setTime] = useState(COOL_DOWN_TIME);
  const [isEditMode, setEditMode] = useState(false);

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
                activeStep={activeStep}
                setIsEnabled={setIsEnabled}
                setEditMode={setEditMode}
              />
            )}
            <h1>Відновлення паролю</h1>
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
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                  />
                </Step>
                <Step key={"code"} className={styles.stepper__step}>
                  <Code
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                    time={time}
                    setTime={setTime}
                    setActiveTimer={setActiveTimer}
                    setActiveStep={setActiveStep}
                    setEditMode={setEditMode}
                    isActiveTimer={isActiveTimer}
                    phoneNumber={phoneNumber}
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
              </Stepper>
            </div>
          </div>
          {!isEditMode && (
            <div className={styles.authWrapper__modal_absolute_links}>
              <Link href={"/sign-up"}>
                <a>Реєстрація</a>
              </Link>
              <Link href={"/sign-in"}>
                <a>Авторизація</a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer data={data.global.footer} />
    </div>
  );
};

export default ResetPassword;

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
