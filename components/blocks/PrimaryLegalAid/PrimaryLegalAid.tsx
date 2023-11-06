import styles from "./PrimaryLegalAid.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsPrimaryLegalAid } from "@/tina/__generated__/types";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
import Image from "@/assets/arrow-right.svg";
import { motion } from "framer-motion";
import ArrowDown from "@/assets/arrow-down-small.svg";
import { useState } from "react";

export const PrimaryLegalAid = ({
  data,
}: {
  data: PageComponentsPrimaryLegalAid;
}) => {
  const { title, aid: aids } = data;
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
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  const displayedGenders = aids && (!showAll ? aids : aids.slice(0, 5));
  return (
    <main className={styles.aid}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.aid__inner}>
          {displayedGenders &&
            (isMobile ? displayedGenders : aids).map(
              (a, index) =>
                a &&
                !a.hidden &&
                (a.link || a.url) && (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    {a.link || a.url ? (
                      <Link
                        key={index}
                        data-tina-field={tinaField(a)}
                        href={getHref(a.link || a.url) as string}
                      >
                        <a
                          className={styles.aid__inner_item}
                          target={getTarget(a.url)}
                          download={getDownload(a.link || a.url)}
                          data-tina-field={tinaField(a)}
                        >
                          <div className={styles.aid__inner_item_text}>
                            <div />
                            {a.title && (
                              <h5 data-tina-field={tinaField(a, "title")}>
                                {a.title}
                              </h5>
                            )}
                          </div>
                          <Image />
                        </a>
                      </Link>
                    ) : null}
                  </motion.div>
                )
            )}

          {aids && aids.length > 5 && (isMobile as boolean) && (
            <div onClick={toggleShowAll} className={styles.showButton}>
              {showAll ? "Дивитися більше" : "Дивитися менше"}
              <motion.div
                initial={false}
                animate={{
                  rotate: !showAll ? 180 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                <ArrowDown height={25} />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
