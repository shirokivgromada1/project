import styles from "./StrategyDesc.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsStrategyDesc } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";

export const StrategyDesc = ({
  data,
}: {
  data: PageComponentsStrategyDesc;
}) => {
  const { title, text, goals: goals } = data;

  return (
    <main className={styles.strategy}>
      <div className="container">
        <div className={styles.strategy__headline}>
          <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
          <hr />
          <div>
            {text?.children.map((annItem: any, annIndex: number) => {
              if (annItem.type.startsWith("h"))
                return annItem.children.map((text: any) => (
                  <annItem.type
                    key={"announceHeadline" + annIndex}
                    style={{
                      fontWeight: text.bold && "bold",
                      fontStyle: text.italic && "italic",
                    }}
                    data-tina-field={tinaField(data, "text")}
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
                    data-tina-field={tinaField(data, "text")}
                  >
                    {text.text}
                  </p>
                ));
              return null;
            })}
          </div>
        </div>
        <div className={styles.strategy__list}>
          {goals &&
            goals.map(
              (g, index) =>
                g &&
                !g.isHidden && (
                  <div
                    className={styles.strategy__list_item}
                    data-tina-field={tinaField(g)}
                  >
                    <div className={styles.goal}>
                      <p
                        className={styles.goal__title}
                        data-tina-field={tinaField(g, "title")}
                      >
                        {g?.title}{" "}
                      </p>
                      <p
                        className={styles.goal__desc}
                        data-tina-field={tinaField(g, "desc")}
                      >
                        {g?.desc}
                      </p>
                    </div>
                    {g?.image && (
                      <Image
                        src={g.image}
                        width={407}
                        height={190}
                        alt={`strategy goal ${++index}`}
                        data-tina-field={tinaField(g, "image")}
                      />
                    )}
                  </div>
                )
            )}
        </div>
      </div>
    </main>
  );
};
