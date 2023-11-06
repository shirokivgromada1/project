import styles from "./StrategyLink.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsStrategyLink } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";

export const StrategyLink = ({
  data,
}: {
  data: PageComponentsStrategyLink;
}) => {
  const { title, url, urlText, firstText, secondText } = data;
  const isMobile = useBetterMediaQuery("(max-width: 530px");

  return (
    <main className={styles.link}>
      <div className="container">
        <div className={styles.link__inner}>
          <h2 data-tina-field={tinaField(data, "title")}>
            {title}
            {url && (
              <a
                href={url}
                target="_blank"
                data-tina-field={tinaField(data, "url")}
              >
                {urlText}
              </a>
            )}
          </h2>
          <div className={styles.link__inner_desc}>
            <div>
              {firstText?.children.map((annItem: any, annIndex: number) => {
                if (annItem.type.startsWith("h"))
                  return annItem.children.map((text: any) => (
                    <annItem.type
                      key={"announceHeadline" + annIndex}
                      style={{
                        fontWeight: text.bold && "bold",
                        fontStyle: text.italic && "italic",
                      }}
                      data-tina-field={tinaField(data, "firstText")}
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
                      data-tina-field={tinaField(data, "firstText")}
                    >
                      {text.text}
                    </p>
                  ));
                return null;
              })}
            </div>
            <div>
              {secondText?.children.map((annItem: any, annIndex: number) => {
                if (annItem.type.startsWith("h"))
                  return annItem.children.map((text: any) => (
                    <annItem.type
                      key={"announceHeadline" + annIndex}
                      style={{
                        fontWeight: text.bold && "bold",
                        fontStyle: text.italic && "italic",
                      }}
                      data-tina-field={tinaField(data, "secondText")}
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
                      data-tina-field={tinaField(data, "secondText")}
                    >
                      {text.text}
                    </p>
                  ));
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
