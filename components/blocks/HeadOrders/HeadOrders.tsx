import styles from "./HeadOrders.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsHeadOrders } from "@/tina/__generated__/types";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import { Documents } from "@/components/blocks/Documents/Documents";

export const HeadOrders = ({ data }: { data: PageComponentsHeadOrders }) => {
  const { title, subtitle, notMain, order: orders } = data;
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
    return isPdf(date as string) ? undefined : "_blank";
  }

  function getDownload(date: string | undefined | null): boolean | undefined {
    return date === null || date === undefined || isPdf(date) || undefined;
  }
  return (
    <main className={styles.orders}>
      <div className="container">
        <h1
          data-tina-field={tinaField(data, "title")}
          style={{
            fontSize: `${notMain ? "28px" : ""}`,
            textTransform: `${notMain ? "initial" : "uppercase"}`,
            maxWidth: `${notMain ? "708px" : "initial"}`,
            ...(match
              ? {
                  fontSize: `${notMain ? "22px" : ""}`,
                }
              : {}),
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <h2 data-tina-field={tinaField(data, "subtitle")}>{subtitle}</h2>
        )}
        <div className={styles.orders__inner}>
          {orders &&
            orders.map(
              (o, index) =>
                o &&
                !o.hidden && (
                  <div
                    className={styles.orders__inner_item}
                    key={index}
                    data-tina-field={tinaField(o)}
                  >
                    <div className={styles.orders__inner_item_text}>
                      <div />
                      {o.title && (
                        <h5 data-tina-field={tinaField(o, "title")}>
                          {o.title}
                        </h5>
                      )}
                    </div>
                    {o.link || o.url ? (
                      <a
                        href={getHref(o.link || o.url)}
                        target={getTarget(o.url)}
                        download={getDownload(o.link || o.url)}
                        data-tina-field={tinaField(o, "buttonText")}
                      >
                        {!match ? (
                          o?.buttonText || "Завантажити"
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
