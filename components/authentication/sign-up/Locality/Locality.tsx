import { Button, StepContent, StepLabel } from "@mui/material";
import styles from "./Locality.module.scss";
import ReactSelect, { PropsValue } from "react-select";
import CustomOption from "./components/CustomOption/CustomOption";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { DATA_ENDPOINTS } from "@/constants/endpoints";
import { toast } from "react-toastify";

export type locality = {
  value: string;
  label: string;
  district: string;
};

const _: locality[] = [
  {
    value: "с. Широке",
    label: "с. Широке",
    district: "Адміністративний центр",
  },
  { value: "с-ще Сонячне", label: "с-ще Сонячне", district: "Сонячний округ" },
  {
    value: "с-ще Відрадне",
    label: "с-ще Відрадне",
    district: "Відраднівський округ",
  },
  {
    value: "с. Августинівка",
    label: "с. Августинівка",
    district: "Августинівський округ",
  },
  {
    value: "с. Лемешинське",
    label: "с. Лемешинське",
    district: "Августинівський округ",
  },
  {
    value: "с. Івангород",
    label: "с. Івангород",
    district: "Августинівський округ",
  },
  {
    value: "с. Привітне",
    label: "с. Привітне",
    district: "Августинівський округ",
  },
  {
    value: "с. Світанок",
    label: "с. Світанок",
    district: "Августинівський округ",
  },
  {
    value: "Новоселище",
    label: "Новоселище",
    district: "Августинівський округ",
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
  location: PropsValue<locality> | undefined;
  setLocation: Dispatch<SetStateAction<PropsValue<locality> | undefined>>;
  isEnabled: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
};

const Locality = ({
  location,
  setLocation,
  isEnabled,
  setActiveStep,
  setIsEnabled,
}: Props) => {
  const [localityOptions, setLocalityOptions] = useState(_);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}${DATA_ENDPOINTS.LIST_VILLAGES}/`
      )
      .then((response) => {
        setLocalityOptions(response.data.villages);

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
    setActiveStep(5);
    setIsEnabled(false);
  };

  useEffect(() => {
    if (location) setIsEnabled(true);
    else setIsEnabled(false);
  }, [location]);

  const handleStep = () => {
    if (location) setActiveStep(4);
  };

  return (
    <>
      <StepLabel className={styles.stepper__step_label} onClick={handleStep}>
        Ваш населений пункт
      </StepLabel>
      <StepContent className={styles.stepper__step_content}>
        <div className={styles.stepper__step_content_wrapper}>
          <div className={styles.stepper__step_content_flex}>
            <ReactSelect
              value={location}
              placeholder="Ваш населений пункт"
              components={{ Option: CustomOption }}
              onChange={setLocation}
              options={localityOptions}
              className={styles.selectLocality}
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
              disabled={location ? false : !isEnabled}
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

export default Locality;
