import styles from "./Leadership.module.scss";
import { PageComponentsLeadership } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import DownloadIcon from "../../../assets/download-icon.svg";
import { useState } from "react";
export const Leadership = ({ data }: { data: PageComponentsLeadership }) => {
  const { title, addition: additions } = data;
  const match = useBetterMediaQuery("(max-width: 850px)");
  function isPdf(url: string | undefined): boolean {
    return typeof url === "string" && url.toLowerCase().endsWith(".pdf");
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
    <main className={styles.leadership}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.leadership__inner}>
          {additions &&
            additions.map(
              (a, index) =>
                a &&
                !a.hidden && (
                  <div
                    data-tina-field={tinaField(a)}
                    className={styles.additionCard}
                  >
                    {!match ? (
                      <>
                        {a.additionTitle && (
                          <h5 data-tina-field={tinaField(a, "additionTitle")}>
                            {a.additionTitle}
                          </h5>
                        )}
                        {a.additionDescription && (
                          <p
                            data-tina-field={tinaField(
                              a,
                              "additionDescription"
                            )}
                          >
                            {a.additionDescription}
                          </p>
                        )}
                      </>
                    ) : (
                      <div>
                        {a.additionTitle && (
                          <h5 data-tina-field={tinaField(a, "additionTitle")}>
                            {a.additionTitle}
                          </h5>
                        )}
                        {a.additionDescription && (
                          <p
                            data-tina-field={tinaField(
                              a,
                              "additionDescription"
                            )}
                          >
                            {a.additionDescription}
                          </p>
                        )}
                      </div>
                    )}
                    {a?.additionDownload?.file || a?.additionDownload?.url ? (
                      <a
                        key={index}
                        href={getHref(
                          a?.additionDownload?.file || a?.additionDownload?.url
                        )}
                        target={getTarget(a?.additionDownload?.url)}
                        download={getDownload(
                          a?.additionDownload?.file || a?.additionDownload?.url
                        )}
                        data-tina-field={tinaField(
                          a?.additionDownload,
                          "buttonText"
                        )}
                      >
                        {!match ? (
                          a?.additionDownload?.buttonText || "Завантажити"
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
    </main>
  );
};
