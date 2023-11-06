import styles from "./GuardiansBoardTasks.module.scss";
import { PageComponentsGuardiansBoardTasks } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Arrow from "../../../assets/arrow-down-small.svg";
export const GuardiansBoardTasks = ({
  data,
}: {
  data: PageComponentsGuardiansBoardTasks;
}) => {
  const { tasks: tasks } = data;
  const isMobile = useBetterMediaQuery("(max-width: 500px)");
  const isTinyMobile = useBetterMediaQuery("(max-width: 430px)");
  const [selected, setSelected] = useState(null);

  const toggleAccordion = (index: any) => {
    setSelected(index === selected ? null : index);
  };
  return (
    <main className={styles.tasks}>
      <div className="container">
        <div className={styles.tasks__list}>
          {tasks &&
            tasks.map(
              (t, index) =>
                t &&
                !t.isHidden &&
                (isMobile ? (
                  <div
                    key={index}
                    className={styles.tasks__list_item}
                    data-tina-field={tinaField(t)}
                  >
                    <div
                      className={`${index === selected ? styles.active : ""} ${
                        styles.tasks__list_item_title
                      }`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <p>{t?.name}</p>
                      <Arrow
                        className={`${
                          index === selected ? styles.activeArrow : ""
                        }`}
                      />
                    </div>
                    <AnimatePresence>
                      {selected === index && (
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{ duration: 0.3 }}
                          className={styles.tasks__list_item_desc}
                        >
                          <p>{t?.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div
                    key={index}
                    className={styles.tasks__list_item}
                    data-tina-field={tinaField(t)}
                  >
                    <div className={styles.tasks__list_item_title}>
                      <p>{t?.name}</p>
                    </div>
                    <div className={styles.tasks__list_item_desc}>
                      <p>{t?.desc}</p>
                    </div>
                  </div>
                ))
            )}
        </div>
      </div>
    </main>
  );
};
