import styles from "./DepartmentSocialProtection.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsDepartmentSocialProtection } from "@/tina/__generated__/types";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
import Image from "@/assets/arrow-right.svg";
import { motion } from "framer-motion";
import ArrowDown from "@/assets/arrow-down-small.svg";
import { useState } from "react";

export const DepartmentSocialProtection = ({
  data,
}: {
  data: PageComponentsDepartmentSocialProtection;
}) => {
  const { title, links: links } = data;
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
          {links &&
            links.map((l, index) =>
              l && !l.hidden && l.url ? (
                <Link
                  key={index}
                  data-tina-field={tinaField(l)}
                  href={getHref(l.url) as string}
                >
                  <a
                    className={styles.department__inner_item}
                    target={getTarget(l.url)}
                    download={getDownload(l.url)}
                    data-tina-field={tinaField(l, "url")}
                  >
                    <div className={styles.department__inner_item_text}>
                      <div />
                      {l.title && (
                        <h5 data-tina-field={tinaField(l, "title")}>
                          {l.title}
                        </h5>
                      )}
                    </div>
                    <Image />
                  </a>
                </Link>
              ) : null
            )}
        </div>
      </div>
    </main>
  );
};
