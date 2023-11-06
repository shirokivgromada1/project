import styles from "./DepartmentSocialProtectionSub.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsDepartmentSocialProtectionSub } from "@/tina/__generated__/types";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
import Image from "@/assets/arrow-right.svg";
import { motion } from "framer-motion";
import ArrowDown from "@/assets/arrow-down-small.svg";
import { useState } from "react";

export const DepartmentSocialProtectionSub = ({
  data,
}: {
  data: PageComponentsDepartmentSocialProtectionSub;
}) => {
  const { title, links: links, desc } = data;
  const match = useBetterMediaQuery("(max-width: 768px)");
  const isMobile = useBetterMediaQuery("(max-width: 390px)");
  function isPdf(url: string): boolean {
    return url?.toLowerCase().endsWith(".pdf");
  }
  function getHref(date: string | undefined | null): string | undefined {
    if (date !== null && date !== undefined) {
      return date;
    }
    return undefined;
  }

  function getTarget(date: string | undefined | null): string | undefined {
    return isPdf(date as string) || date?.startsWith("/")
      ? undefined
      : "_blank";
  }

  function getDownload(date: string | undefined | null): boolean | undefined {
    return date === null || date === undefined || isPdf(date) || undefined;
  }

  return (
    <main className={styles.department}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.department__inner}>
          <div className={styles.department__desc}>
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
          <div className={styles.department__links}>
            {links &&
              links.map(
                (l, index) =>
                  l &&
                  !l.hidden && (
                    <div
                      className={styles.department__links_item}
                      key={index}
                      data-tina-field={tinaField(l)}
                    >
                      <div className={styles.department__links_item_text}>
                        <div />
                        {l.title && (
                          <h5 data-tina-field={tinaField(l, "title")}>
                            {l.title}
                          </h5>
                        )}
                      </div>
                      {l.link || l.url ? (
                        <a
                          href={getHref(l.link || l.url)}
                          target={getTarget(l.url)}
                          download={getDownload(l.link || l.url)}
                          data-tina-field={tinaField(l, "buttonText")}
                        >
                          {!match ? (
                            l?.buttonText || "Завантажити"
                          ) : (
                            <DownloadIcon />
                          )}
                        </a>
                      ) : null}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </main>
  );
};
