import styles from "./AboutTowns.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsAboutTowns } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";
import { useState } from "react";
import ArrowUp from "../../../assets/arrow-down-thin.svg";
import ArrowDown from "../../../assets/arrow-down-thin.svg";
import { motion, AnimatePresence } from "framer-motion";

export const AboutTowns = ({ data }: { data: PageComponentsAboutTowns }) => {
  const { desc, districts: districts } = data;
  const isMobile = useBetterMediaQuery("(max-width: 450px");
  const isWideScreen = useBetterMediaQuery("(min-width: 768px)");
  const [towns, setTowns] = useState<boolean[]>([]);

  const handleShowTownsClick = (index: number) => {
    setTowns((prevState) => {
      const updatedTowns = [...prevState];
      updatedTowns[index] = !updatedTowns[index];
      return updatedTowns;
    });
  };

  return (
    <div className={styles.towns}>
      <div className="container">
        <div className={styles.towns__inner}>
          <div className={styles.towns__inner_desc}>
            {desc?.children.map((annItem: any, annIndex: number) => {
              if (annItem.type.startsWith("h"))
                return annItem.children.map((text: any) => (
                  <annItem.type
                    key={"announceHeadline" + annIndex}
                    style={{
                      fontWeight: text.bold && "bold",
                      fontStyle: text.italic && "italic",
                    }}
                    data-tina-field={tinaField(data, "desc")}
                  >
                    {text.text}
                  </annItem.type>
                ));
              if (annItem.type.startsWith("p"))
                return annItem.children.map((text: any) => (
                  <p
                    key={"announceParagraph" + annIndex}
                    style={{
                      fontWeight: text.bold && "bold",
                      fontStyle: text.italic && "italic",
                    }}
                    data-tina-field={tinaField(data, "desc")}
                  >
                    {text.text}
                  </p>
                ));
              return null;
            })}
          </div>
          <div className={styles.towns__list}>
            {districts &&
              districts.map(
                (d, index) =>
                  d &&
                  !d.hidden && (
                    <AnimatePresence>
                      <motion.div
                        key={index}
                        className={`${towns[index] ? styles.show : null}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        data-tina-field={tinaField(d)}
                      >
                        <button onClick={() => handleShowTownsClick(index)}>
                          <h5 data-tina-field={tinaField(d, "name")}>
                            {d?.name}
                          </h5>
                          <ArrowDown
                            className={`${
                              towns[index] ? styles.transform : null
                            }`}
                          />
                        </button>
                        {towns[index] && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            data-tina-field={tinaField(d, "towns")}
                          >
                            {d?.towns}
                          </motion.p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
