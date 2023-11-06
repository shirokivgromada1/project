import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ReadOnly.module.scss";
import axiosInstance from "@/interceptors/axios";
import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import Field from "../../../../Field/Field";
import Button from "@/components/util/Button/Button";

type Props = {
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

const ReadOnly = ({ setUpdate }: Props) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosInstance
      .get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.CAN_PASSWORD_UPDATE}/`
      )
      .then(() => {
        setCanUpdate(true);
      })
      .catch((err) => {
        const { message } = err.response.data;
        setMessage(message);
      });
  }, []);

  const handleClick = () => {
    setUpdate(true);
  };

  return (
    <div className={styles.readOnly}>
      <Field
        type={"text"}
        placeholder="••••••••••"
        id="readOnly-password"
        label="Ваш пароль:"
        readOnly={true}
      />
      <Button
        type={"button"}
        onClick={handleClick}
        disabled={!canUpdate}
        toolTip={message}
      >
        Змінити
      </Button>
    </div>
  );
};

export default ReadOnly;
