import styles from "./AdministrativeServicesFavors.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsAdministrativeServicesFavors } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";
import DownIcon from "../../../assets/arrow-down.svg";
import DownIconTablet from "../../../assets/arrow-down-small.svg";
import { useState } from "react";
import DownloadIcon from "@/assets/download-icon.svg";
import { motion, AnimatePresence } from "framer-motion";
export const AdministrativeServicesFavors = ({
  data,
}: {
  data: PageComponentsAdministrativeServicesFavors;
}) => {
  const { title, favor: favors } = data;
  const match = useBetterMediaQuery("(max-width: 768px)");
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const isMobile = useBetterMediaQuery("(max-width: 391px)");
  const [favor, setFavor] = useState<null | number>(null);
  const handleFavorClick = (number: number) => {
    if (number === favor) {
      setFavor(null);
    } else {
      setFavor(number);
    }
  };
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
    <main className={styles.favors}>
      <div className="container">
        <h2 data-tina-field={tinaField(data, "title")}>{title}</h2>
        <div className={styles.favors__inner}>
          {favors &&
            favors.map((f, index) => (
              <>
                {f && !f.hidden && (
                  <div className={styles.favors__inner_favor}>
                    <div
                      className={`${favor === index ? styles.active : ""} ${
                        styles.favors__inner_favor_title
                      }`}
                      onClick={() => handleFavorClick(index)}
                    >
                      <h3 data-tina-field={tinaField(f, "title")}>{f.title}</h3>
                      {isTablet ? <DownIconTablet /> : <DownIcon />}
                    </div>
                    <AnimatePresence initial={false}>
                      {favor === index && (
                        <motion.ul
                          className={`${
                            favor === index ? styles.clicked : ""
                          } ${styles.favors__inner_favor_list}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {f.list?.map((i, index) => (
                            <>
                              {i && (
                                <li key={index} data-tina-field={tinaField(i)}>
                                  <p data-tina-field={tinaField(i, "title")}>
                                    {!isMobile && <span>{index + 1}.</span>}
                                    <span>{i.title}</span>
                                  </p>
                                  <a
                                    href={getHref(i?.link || i?.url)}
                                    target={getTarget(i?.url)}
                                    download={getDownload(i?.link || i?.url)}
                                    data-tina-field={tinaField(i, "buttonText")}
                                  >
                                    {!match ? (
                                      i?.buttonText || "Інформаційна картка"
                                    ) : (
                                      <DownloadIcon />
                                    )}
                                  </a>
                                </li>
                              )}
                            </>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </main>
  );
};
