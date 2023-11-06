import { Button, StepContent, StepLabel } from "@mui/material";
import styles from "./Status.module.scss";
import ReactSelect, { PropsValue } from "react-select";
import CustomOption from "./components/CustomOption/CustomOption";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { DATA_ENDPOINTS } from "@/constants/endpoints";
import { toast } from "react-toastify";

export type status = {
  value: string;
  label: string;
};

const _: status[] = [
  {
    value: "ВПО",
    label: "ВПО",
  },
  {
    value: "Людина з інвалідністю",
    label: "Людина з інвалідністю",
  },
  {
    value: "Особа похилого віку",
    label: "Особа похилого віку",
  },
  {
    value: "Багатодітна родина",
    label: "Багатодітна родина",
  },
  {
    value: "Всі",
    label: "Всі",
  },
  {
    value: "Нічого",
    label: "Нічого",
  },
];
const stylesSelect = {
  menuList: (base: any) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "9px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#8D8A8A",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
};

type Props = {
  status: PropsValue<status> | undefined;
  setStatus: Dispatch<SetStateAction<PropsValue<status> | undefined>>;
  isEnabled: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

const Status = ({
  status,
  setStatus,
  isEnabled,
  setActiveStep,
  setIsEnabled,
  setEditMode,
}: Props) => {
  const [statusOptions, setStatusOptions] = useState(_);
  const [_status, _setStatus] = useState<PropsValue<status> | undefined>(
    status
  );

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}${DATA_ENDPOINTS.LIST_STATUSES}/`
      )
      .then((response) => {
        setStatusOptions(response.data.statuses);

        toast.success(response.data.message, {
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
      .catch((error) => {
        toast.error(error.data.message, {
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
  }, []);

  const handleClick = () => {
    setActiveStep(6);
    setStatus(_status);
    setEditMode(false);
  };

  useEffect(() => {
    if (_status) setIsEnabled(true);
    else setIsEnabled(false);
  }, [_status]);

  const handleStep = () => {
    if (status) setActiveStep(5);
  };

  return (
    <>
      <StepLabel className={styles.stepper__step_label} onClick={handleStep}>
        Ваш статус
      </StepLabel>
      <StepContent className={styles.stepper__step_content}>
        <div className={styles.stepper__step_content_wrapper}>
          <div className={styles.stepper__step_content_flex}>
            <ReactSelect
              value={_status}
              placeholder="Ваш статус"
              components={{ Option: CustomOption }}
              onChange={_setStatus}
              options={statusOptions}
              className={styles.selectStatus}
              theme={(theme) => ({
                ...theme,
                borderRadius: 7,
                colors: {
                  ...theme.colors,
                  primary25: "#F6F6F6",
                  primary: "transparent",
                },
              })}
              styles={stylesSelect}
            />
            <Button
              disabled={_status ? false : !isEnabled}
              variant="contained"
              onClick={handleClick}
            >
              Підтвердити
            </Button>
          </div>
        </div>
      </StepContent>
    </>
  );
};

export default Status;
