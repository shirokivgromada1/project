import { SyncLoader } from "react-spinners";
import styles from "./Loader.module.scss";

type Props = {};

const Loader = (props: Props) => {
  return <SyncLoader color={styles.primaryColor} size={10} />;
};

export default Loader;
