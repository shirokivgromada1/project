import { useFocus } from "./../../../../../hooks/useFocus";
import styles from "./Filter.module.scss";

import SearchIcon from "./../../../../../assets/search.svg";
import CategoryIcon from "./../../../../../assets/category.svg";

import CustomDatePicker from "./../DatePicker/DatePicker";
import { FC, useEffect, useState } from "react";
import { useFilter } from "./../../../../../context/FilterContext";
import { AnimatePresence, motion } from "framer-motion";
import { Maybe } from "@/tina/__generated__/types";
import { FiSearch } from "react-icons/fi";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import client from "@/tina/__generated__/client";
import { AsyncReturnType } from "@/pages/[filename]";
import { Backdrop, Fade, Menu, MenuItem, Modal } from "@mui/material";

interface IFilter {
  className?: string;
  hasCalendar?: Maybe<boolean> | undefined;
  hasSearch?: Maybe<boolean> | undefined;
  hasCategory?: Maybe<boolean> | undefined;
}

const getCategories = async () => {
  const categoriesResponse = await client.queries.newsCategoriesConnection();
  return categoriesResponse.data.newsCategoriesConnection.edges;
};

const Filter: FC<IFilter> = ({
  className,
  hasCalendar = true,
  hasSearch = true,
  hasCategory = true,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [inputRef, setInputFocus] = useFocus();
  const [categories, setCategories] = useState<AsyncReturnType<
    typeof getCategories
  > | null>(null);

  const [isViewSearch, setViewSearch] = useState(false);
  const [isViewCategory, setViewCategory] = useState(false);
  const {
    category: selectedCategory,
    onChangeCategory: setCategory,
    search,
    onChangeSearch,
  } = useFilter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getContent = async () => {
      const categoriesResponse = await getCategories();
      if (categoriesResponse) setCategories(categoriesResponse);
    };
    getContent();
    if (!categories) getContent();
  }, []);

  const matches = useBetterMediaQuery(
    "(max-width: 1100px) and (min-width:690px)"
  );

  if (matches && hasCategory) {
    return (
      <>
        <div
          className={styles.filter + " " + className}
          style={{ marginBottom: 10 }}
        >
          {hasCalendar && (
            <div>
              <CustomDatePicker />
            </div>
          )}
          {hasSearch && (
            <div className={styles.filter_search}>
              <button
                type="button"
                onClick={() => {
                  setInputFocus();
                  setViewSearch(true);
                }}
                className={
                  styles.filter_search_button +
                  " " +
                  (isViewSearch ? styles.filter_search_button_active : "")
                }
                onBlur={() => setViewSearch(false)}
              >
                <FiSearch />
                <input
                  placeholder="Введіть слово"
                  type="text"
                  ref={inputRef}
                  value={search || ""}
                  onChange={(e) => onChangeSearch(e.currentTarget.value)}
                />
              </button>
            </div>
          )}
        </div>
        <div className={styles.filter + " " + className}>
          {hasCategory && (
            <div className={styles.filter_category}>
              <button
                type="button"
                className={
                  styles.filter_category_button +
                  " " +
                  (open ? styles.filter_category_button_active : "")
                }
                onClick={handleClick}
              >
                <CategoryIcon />
                <span>{selectedCategory ?? "Оберіть категорію"}</span>
                <AnimatePresence>
                  {selectedCategory && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory(null);
                        setAnchorEl(null);
                      }}
                      style={{ marginLeft: "auto" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.63159 14.3692L10.0008 10L14.3699 14.3692M14.3699 5.63086L9.99993 10L5.63159 5.63086"
                          stroke="#484848"
                          strokeOpacity="0.63"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <AnimatePresence>
                <Menu
                  transitionDuration={0}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: "332px",
                      marginTop: "8px",
                      borderRadius: "20px",
                      backgroundColor: "#fff",
                      boxShadow:
                        "0px 4px 26px 0px rgba(176, 176, 176, 0.09),  0px -3px 17px 0px rgba(101, 101, 101, 0.06);",
                    },
                  }}
                  className={styles.filter_category_modal}
                >
                  {categories?.map((category, index) => (
                    <MenuItem
                      key={"category" + index}
                      onClick={() => {
                        setCategory(category?.node?.category || null);
                        handleClose();
                      }}
                      className={
                        selectedCategory === category?.node?.category
                          ? styles.filter_category_modal_active
                          : ""
                      }
                    >
                      {category?.node?.category}
                    </MenuItem>
                  ))}
                </Menu>
              </AnimatePresence>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.filter + " " + className}>
      {hasCalendar && (
        <div>
          <CustomDatePicker />
        </div>
      )}
      {hasSearch && (
        <div className={styles.filter_search}>
          <button
            type="button"
            onClick={() => {
              setInputFocus();
              setViewSearch(true);
            }}
            className={
              styles.filter_search_button +
              " " +
              (isViewSearch ? styles.filter_search_button_active : "")
            }
            onBlur={() => setViewSearch(false)}
          >
            <FiSearch />
            <input
              placeholder="Введіть слово"
              type="text"
              ref={inputRef}
              value={search || ""}
              onChange={(e) => onChangeSearch(e.currentTarget.value)}
            />
          </button>
        </div>
      )}
      {hasCategory && (
        <div className={styles.filter_category}>
          <button
            type="button"
            className={
              styles.filter_category_button +
              " " +
              (open ? styles.filter_category_button_active : "")
            }
            onClick={handleClick}
            id="unique-id"
          >
            <CategoryIcon />
            <span>{selectedCategory ?? "Оберіть категорію"}</span>
            <AnimatePresence>
              {selectedCategory && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategory(null);
                    setAnchorEl(null);
                  }}
                  style={{ marginLeft: "auto" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.63159 14.3692L10.0008 10L14.3699 14.3692M14.3699 5.63086L9.99993 10L5.63159 5.63086"
                      stroke="#484848"
                      strokeOpacity="0.63"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence>
            <Menu
              transitionDuration={0}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                style: {
                  width: "332px",
                  marginTop: "8px",
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  boxShadow:
                    "0px 4px 26px 0px rgba(176, 176, 176, 0.09),  0px -3px 17px 0px rgba(101, 101, 101, 0.06);",
                },
              }}
              className={styles.filter_category_modal}
            >
              {categories?.map((category, index) => (
                <MenuItem
                  key={"category" + index}
                  onClick={() => {
                    setCategory(category?.node?.category || null);
                    handleClose();
                  }}
                  className={
                    selectedCategory === category?.node?.category
                      ? styles.filter_category_modal_active
                      : ""
                  }
                >
                  {category?.node?.category}
                </MenuItem>
              ))}
            </Menu>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Filter;
