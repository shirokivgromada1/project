import styles from "./SilradaDepartmentFunctions.module.scss";
import { PageComponentsSilradaDepartmentFunctions } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DownIcon from "../../../assets/arrow-down-thin.svg";

export const SilradaDepartmentFunctions = ({
  data,
}: {
  data: PageComponentsSilradaDepartmentFunctions;
}) => {
  const { title, function: functions } = data;
  const isTablet = useBetterMediaQuery("(min-width: 768px)");
  const isDesktop = useBetterMediaQuery("(min-width: 1251px");
  const [openFunctions, setOpenFunctions] = useState(false);

  const handleFunctionsClick = () => {
    setOpenFunctions((prev) => !prev);
  };
  const countFunctions = isDesktop ? 8 : isTablet ? 6 : 8;
  return (
    <main className={styles.functions}>
      <div className="container">
        <h3 data-tina-field={tinaField(data, "title")}>{title}</h3>
        <ul className={styles.functions__list}>
          {functions &&
            functions.map(
              (f, index) =>
                f &&
                !f.isHidden && (
                  <AnimatePresence initial={false} key={index}>
                    {index < countFunctions || openFunctions ? (
                      <motion.li
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: -20,
                          transition: { duration: 0.2 },
                        }}
                        key={index}
                        className={styles.functions__list_item}
                        data-tina-field={tinaField(f)}
                      >
                        {f?.url ? (
                          <a
                            className={styles.functions__list_item_paragraph}
                            target="_blank"
                          >
                            {f?.name}
                          </a>
                        ) : (
                          <p className={styles.functions__list_item_paragraph}>
                            {f?.name}
                          </p>
                        )}
                      </motion.li>
                    ) : null}
                  </AnimatePresence>
                )
            )}
        </ul>
        <div className={styles.functions__button}>
          {functions && functions.length > countFunctions ? (
            <span onClick={() => handleFunctionsClick()}>
              {openFunctions ? "Сховати" : "Показати ще"}
            </span>
          ) : null}
        </div>
      </div>
    </main>
  );
};
