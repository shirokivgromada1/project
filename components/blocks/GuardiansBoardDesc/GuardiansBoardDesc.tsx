import styles from "./GuardiansBoardDesc.module.scss";
import { PageComponentsGuardiansBoardDesc } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import DownIcon from "../../../assets/arrow-down-thin.svg";
export const GuardiansBoardDesc = ({
  data,
}: {
  data: PageComponentsGuardiansBoardDesc;
}) => {
  const { title, desc, function: functions } = data;
  const isMobile = useBetterMediaQuery("(max-width: 531px)");
  const isTinyMobile = useBetterMediaQuery("(max-width: 430px)");
  return (
    <main className={styles.board}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
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
        <ul className={styles.board__list}>
          {functions &&
            functions.map(
              (f, index) =>
                f &&
                !f.isHidden && (
                  <li
                    key={index}
                    className={styles.board__list_item}
                    data-tina-field={tinaField(f)}
                  >
                    <p className={styles.board__list_item_paragraph}>
                      {f?.name}
                    </p>
                  </li>
                )
            )}
        </ul>
      </div>
    </main>
  );
};
