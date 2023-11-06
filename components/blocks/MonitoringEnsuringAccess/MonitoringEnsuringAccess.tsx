import styles from "./MonitoringEnsuringAccess.module.scss";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";

import useBetterMediaQuery from "../../../hooks/useBetterMediaQuery";
import { PageComponentsMonitoringEnsuringAccess } from "@/tina/__generated__/types";
import Link from "next/link";
import DownloadIcon from "@/assets/download-icon.svg";
export const MonitoringEnsuringAccess = ({
  data,
}: {
  data: PageComponentsMonitoringEnsuringAccess;
}) => {
  const { title, desc, links: links } = data;
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const isMobile = useBetterMediaQuery("(max-width: 391px)");
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
    return isPdf(date as string) ? undefined : "_blank";
  }

  function getDownload(date: string | undefined | null): boolean | undefined {
    return date === null || date === undefined || isPdf(date) || undefined;
  }
  return (
    <main className={styles.monitoring}>
      <div className="container">
        {title && <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>}
        <div className={styles.monitoring__inner}>
          <div className={styles.monitoring__inner_desc}>
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
          <div className={styles.monitoring__inner_links}>
            {links &&
              links.map((l, index) =>
                l && !l.hidden && (l.link || l.url) ? (
                  <a
                    href={getHref(l.link || l.url)}
                    target={getTarget(l.url)}
                    download={getDownload(l.link || l.url)}
                    key={index}
                    data-tina-field={tinaField(l)}
                  >
                    {isTablet ? <div className={styles.linkIcon} /> : null}
                    <h5>{l?.title}</h5>
                  </a>
                ) : null
              )}
          </div>
        </div>
      </div>
    </main>
  );
};
