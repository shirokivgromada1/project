import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Base.module.scss";
import Send from "./forms/Send/Send";
import Verify from "./forms/Verify/Verify";

type Props = {
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

const Base = ({ setUpdate }: Props) => {
  const [isVerified, setVerified] = useState(false);

  return (
    <div className={styles.base}>
      <Send setVerified={setVerified} />
      {isVerified && <Verify setVerified={setVerified} setUpdate={setUpdate} />}
    </div>
  );
};

export default Base;
