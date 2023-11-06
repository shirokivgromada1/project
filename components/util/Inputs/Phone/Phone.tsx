import styles from "./Phone.module.scss";
import Base from "./variants/Base/Base";
import ReadOnly from "./variants/ReadOnly/ReadOnly";
import { useState } from "react";

const Phone = () => {
  const [isUpdate, setUpdate] = useState(false);

  return (
    <div className={styles.phoneContainer}>
      {!isUpdate && <ReadOnly setUpdate={setUpdate} />}
      {isUpdate && <Base setUpdate={setUpdate} />}
    </div>
  );
};

export default Phone;
