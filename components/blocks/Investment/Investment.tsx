import styles from "./Investment.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsInvestment } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";

export const Investment = ({ data }: { data: PageComponentsInvestment }) => {
  const { title, subtitle, firstText, secondText, investTitle, image, button } =
    data;
  const isMobile = useBetterMediaQuery("(max-width: 530px");

  return (
    <main className={styles.investment}>
      <div className="container">
        <div className={styles.investment__headline}>
          <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
          <h2 data-tina-field={tinaField(data, "subtitle")}>{subtitle}</h2>
        </div>
        <div className={styles.investment__wrapper}>
          {image && (
            <Image
              className={styles.investment__banner}
              src={image}
              alt="banner"
              width={904}
              height={isMobile ? 550 : 368}
              data-tina-field={tinaField(data, "image")}
            />
          )}
          <div className={styles.investment__info}>
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
                      data-tina-field={tinaField(data, "firstText")}
                    >
                      {text.text}
                    </p>
                  ));
                return null;
              })}
            </div>
          </div>
          <div className={styles.investment__link}>
            <h2 data-tina-field={tinaField(data, "investTitle")}>
              {investTitle}
            </h2>
            {button?.url && (
              <a href={button?.url} target="_blank" rel="noopener noreferrer">
                <button data-tina-field={tinaField(data, "button")}>
                  {button?.text}
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
