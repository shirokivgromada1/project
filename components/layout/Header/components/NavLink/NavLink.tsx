import styles from "./NavLink.module.scss";
import PropTypes from "prop-types";
import Modal from "./components/Modal";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FC, FocusEvent, ReactNode } from "react";
import { GlobalHeaderNavLinks, Maybe } from "@/tina/__generated__/types";

interface INavLink {
  setActive: ((...args: any[]) => any) | null | undefined;
  onBlur: () => void;
  activeIndex: number | null;
  index: number;
  hasDropDown: Maybe<boolean> | undefined;
  href: Maybe<string> | undefined;
  isView: boolean;
  links: Maybe<Maybe<GlobalHeaderNavLinks>[]> | undefined;
  children: ReactNode;
}

const NavLink: FC<INavLink> = ({
  isView,
  href,
  hasDropDown,
  index,
  activeIndex,
  setActive,
  onBlur,
  children,
  links,
}) => {
  const handleBlur = (e: FocusEvent<HTMLButtonElement>) => {
    const currentTarget = e.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        onBlur();
      }
    });
  };

  return (
    <button
      type="button"
      className={styles.navLink}
      onClick={() => (setActive ? setActive() : undefined)}
      onBlur={(e) => (handleBlur ? handleBlur(e) : undefined)}
    >
      {!hasDropDown && href && children ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        <>{children}</>
      )}
      <AnimatePresence>
        {isView && hasDropDown && index === activeIndex && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 40, position: "relative" }}
          >
            {links && <Modal links={links} />}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default NavLink;
