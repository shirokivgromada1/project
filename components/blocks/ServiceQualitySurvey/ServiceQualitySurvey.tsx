import styles from "./ServiceQualitySurvey.module.scss";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { PageComponentsServiceQualitySurvey } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
export const ServiceQualitySurvey = ({
  data,
}: {
  data: PageComponentsServiceQualitySurvey;
}) => {
  const { title, titleMob, image, url, buttonText, desc } = data;
  const isMobile = useBetterMediaQuery("(max-width: 391px)");
  return (
    <main className={styles.survey}>
      <div className="container">
        <div className={styles.survey__inner}>
          {image && (
            <Image
              src={image}
              width={634}
              height={516}
              alt="survey image"
              data-tina-field={tinaField(data, "image")}
            />
          )}

          <div className={styles.survey__inner_desc}>
            {title && (
              <h1 data-tina-field={tinaField(data, "title")}>
                {!isMobile ? title : titleMob}
              </h1>
            )}
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
            {url && (
              <a
                href={url}
                target="_blank"
                data-tina-field={tinaField(data, "buttonText")}
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
