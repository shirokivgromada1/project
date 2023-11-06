import Footer from "@/components/layout/Footer/Footer";
import client from "@/tina/__generated__/client";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { useTina } from "tinacms/dist/react";
import styles from "./SignIn.module.scss";
import { AsyncReturnType } from "../[filename]";
import Image from "next/image";
import Link from "next/link";
import { Step, Stepper } from "@mui/material";

import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import classNames from "classnames";
import BackStep from "@/components/authentication/sign-up/BackStep/BackStep";
import Phone from "@/components/authentication/sign-in/Phone/Phone";
import Password from "@/components/authentication/sign-in/Password/Password";

const SignIn = (props: AsyncReturnType<typeof getServerSideProps>["props"]) => {
  const [activeStep, setActiveStep] = useState(0);
  const { data } = useTina(props);

  const logo = data.global.footer?.logo;

  const [phoneNumber, setPhone] = useState("+380");
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const [usedPhoneNumbers, setUsedPhoneNumbers] = useState<string[]>([]);

  const [password, setPassword] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const mobileMatch = useBetterMediaQuery("(max-width: 780px)");

  const handleStep = (step: number) => {
    if (step < activeStep) setActiveStep(step);
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
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                setIsEnabled={setIsEnabled}
                setEditMode={setIsEditMode}
              />
            )}
            <h1>Авторизація</h1>
            <div
              className={styles.authWrapper__modal_absolute_container_stepper}
            >
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                className={classNames(styles.stepper, {
                  [styles.stepper_mobile]: mobileMatch,
                })}
              >
                <Step key={"phoneNumber"} className={styles.stepper__step}>
                  <Phone
                    phoneNumber={phoneNumber}
                    setPhone={setPhone}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                    setActiveStep={setActiveStep}
                    isError={isError}
                    setError={setError}
                    message={message}
                    usedPhoneNumbers={usedPhoneNumbers}
                    setEditMode={setIsEditMode}
                    index={0}
                    handleStep={handleStep}
                  />
                </Step>
                <Step key={"password"} className={styles.stepper__step}>
                  <Password
                    setActiveStep={setActiveStep}
                    phoneNumber={phoneNumber}
                    password={password}
                    setPassword={setPassword}
                    usedPhoneNumbers={usedPhoneNumbers}
                    setUsedPhoneNumbers={setUsedPhoneNumbers}
                    setPhoneError={setError}
                    setPhoneMessage={setMessage}
                    index={1}
                    activeStep={activeStep}
                    handleStep={handleStep}
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

export default SignIn;

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
