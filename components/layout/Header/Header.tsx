import styles from "./Header.module.scss";
import Logo from "./../../../assets/logo.svg";
import Eye from "./../../../assets/eye.svg";
import Account from "./../../../assets/account.svg";
import Search from "./../../../assets/search.svg";
import NavLink from "./components/NavLink/NavLink";
import { Dispatch, FC, useEffect, useState } from "react";
import Link from "next/link";
import SanitizeHTML from "./../../util/SanitizeHTML";
import { Skeleton } from "@mui/material";
import EyeModal from "./components/modals/Eye/EyeModal";
import { AnimatePresence } from "framer-motion";
// import { useTheme } from "@/context/ThemeContext";
import SearchModal from "./components/modals/Search/SearchModal";
import { GlobalHeader, Maybe } from "./../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { client } from "./../../../tina/__generated__/client";

interface IHeader {
  setMenuOpen: Dispatch<boolean>;
  menuOpen: boolean;
  data: Maybe<GlobalHeader> | undefined;
}

const Header: FC<IHeader> = ({ setMenuOpen, menuOpen, data }) => {
  const [activeIndex, setActive] = useState<number | null>(null);
  const [isView, setView] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [eyeView, setEyeView] = useState(false);
  const [searchView, setSearchView] = useState(false);
  // const { fontSize } = useTheme();

  const handleMenuClick = () => {
    window.scrollTo(0, 0);
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (eyeView || searchView) {
        body.style.paddingRight = "17px";
        body.style.overflow = "hidden";
      } else
        setTimeout(() => {
          body.style.overflow = "visible";
          body.style.paddingRight = "0px";
        }, 200);
    }
  }, [eyeView, searchView]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__logo}>
          {isLoading && (
            <div className={styles.header__logo_load}>
              <Skeleton variant="rounded" height={38} width={38} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={238} />
            </div>
          )}
          {!isLoading && data && (
            <Link href="/">
              <a>
                {data.icon && (
                  <img
                    data-tina-field={tinaField(data, "icon")}
                    src={data.icon}
                    alt="logo"
                  />
                )}
                <span data-tina-field={tinaField(data, "name")}>
                  {data.name}
                </span>
              </a>
            </Link>
          )}
        </div>
        <nav className={styles.header__nav}>
          <ul>
            {data &&
              data.nav &&
              data.nav.map(
                (link, index) =>
                  link && (
                    <li
                      key={link.label + index}
                      data-tina-field={tinaField(link, "label")}
                    >
                      <NavLink
                        setActive={() => {
                          setActive(activeIndex === index ? null : index);
                          setView(true);
                        }}
                        onBlur={() => {
                          setActive(null);
                          setView(false);
                        }}
                        activeIndex={activeIndex}
                        index={index}
                        hasDropDown={link.isModal}
                        href={`/${link.href}`}
                        isView={isView}
                        links={link.isModal ? link.links : undefined}
                      >
                        <span>{link.label}</span>
                      </NavLink>
                    </li>
                  )
              )}
          </ul>
        </nav>
        <div className={styles.header__options}>
          <div className={styles.header__options_controllers}>
            <>
              <button type="button" onClick={() => setEyeView((prev) => !prev)}>
                <Eye />
              </button>
              <EyeModal setEyeView={setEyeView} eyeView={eyeView} />
            </>
            <button type="button">
              <Link href={"/dashboard"}>
                <a>
                  <Account />
                </a>
              </Link>
            </button>
            <>
              <button
                type="button"
                onClick={() => setSearchView((prev) => !prev)}
              >
                <Search />
              </button>
              <SearchModal
                setSearchView={setSearchView}
                searchView={searchView}
              />
            </>
            <button type="button">ua</button>
          </div>
          <button
            type="button"
            className={styles.header__options_burger}
            onClick={handleMenuClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="14"
              viewBox="0 0 46 14"
              fill="none"
              className={menuOpen ? styles.header__options_burger_active : ""}
            >
              <rect x="17.8384" width="28" height="2" rx="1" fill="#309C54" />
              <rect
                x="0.838379"
                y="6"
                width="45"
                height="2"
                rx="1"
                fill="#309C54"
              />
              <rect
                x="17.8384"
                y="12"
                width="28"
                height="2"
                rx="1"
                fill="#309C54"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
