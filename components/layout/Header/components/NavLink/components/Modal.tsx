import styles from "./Modal.module.scss";
import PropTypes from "prop-types";
import Link from "next/link";
import { GlobalHeaderNavLinks, Maybe } from "@/tina/__generated__/types";

const Modal = ({ links }: { links: Maybe<GlobalHeaderNavLinks>[] }) => {
  return (
    <div className={styles.modal}>
      {links.map(
        (link, index) =>
          link &&
          link.href &&
          link.label && (
            <Link href={`/${link.href}`} key={link.href + index}>
              <a>{link.label}</a>
            </Link>
          )
      )}
    </div>
  );
};

export default Modal;
Modal.propTypes = {
  links: PropTypes.array,
};
