import styles from "./ClinicTitle.module.scss";
import { tinaField } from "tinacms/dist/react";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";
import { PageComponentsClinicTitle } from "@/tina/__generated__/types";

export const ClinicTitle = ({ data }: { data: PageComponentsClinicTitle }) => {
  const { title, logo, buttonText, desc, url } = data;
  const isMobile = useBetterMediaQuery("(max-width: 490px)");
  return (
    <main className={styles.clinic}>
      <div className="container">
        <div className={styles.clinic__title}>
          {logo && !isMobile && (
            <Image
              src={logo}
              width={36}
              height={42}
              alt="logo clinic "
              data-tina-field={tinaField(data, "logo")}
            />
          )}
          <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        </div>
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
        <div className={styles.clinic__button}>
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
    </main>
  );
};
