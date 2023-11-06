import { createContext, useContext, useState } from "react";

type typeUserContextDefaultValues = {
  phoneNumber: string;
  onChangePhoneNumber: (value: string) => void;
  locality: string;
  onChangeLocality: (value: string) => void;
  status: string;
  onChangeStatus: (value: string) => void;
  hasViber: boolean;
  onChangeViber: (value: boolean) => void;
  clear: () => void;
};

const userContextDefaultValues: typeUserContextDefaultValues = {
  phoneNumber: "",
  onChangePhoneNumber(value) {},
  locality: "",
  onChangeLocality(value) {},
  status: "",
  onChangeStatus(value) {},
  hasViber: false,
  onChangeViber(value) {},
  clear: () => {},
};

const UserContext = createContext(userContextDefaultValues);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: any }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locality, setLocality] = useState("");
  const [status, setStatus] = useState("");
  const [hasViber, setViber] = useState(false);

  const onChangePhoneNumber = (value: string) => {
    setPhoneNumber(value);
  };
  const onChangeLocality = (value: string) => {
    setLocality(value);
  };
  const onChangeStatus = (value: string) => {
    setStatus(value);
  };
  const onChangeViber = (value: boolean) => {
    setViber(value);
  };

  const clear = () => {
    onChangePhoneNumber("");
    onChangeLocality("");
    onChangeStatus("");
    onChangeViber(false);
  };

  const value = {
    phoneNumber,
    onChangePhoneNumber,
    locality,
    onChangeLocality,
    status,
    onChangeStatus,
    hasViber,
    onChangeViber,
    clear,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}
