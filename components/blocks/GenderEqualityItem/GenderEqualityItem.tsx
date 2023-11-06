import styles from "./GenderEqualityItem.module.scss";
import { PageComponentsGenderEqualityItem } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "../../../assets/arrow-right.svg";
import Link from "next/link";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import DownloadIcon from "@/assets/download-icon.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import ArrowDownIcon from "../../../assets/arrow-down-small.svg";
import ArrowDown from "@/assets/arrow-down-small.svg";
export const GenderEqualityItem = ({
  data,
}: {
  data: PageComponentsGenderEqualityItem;
}) => {
  const { title, notMain, watchMore, gender: genders } = data;
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
  const [showAll, setShowAll] = useState(watchMore);

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
  const displayedGenders =
    genders && (!showAll ? genders : genders.slice(0, 9));
  return (
    <main className={styles.genderItem}>
      <div className="container">
        <h1
          data-tina-field={tinaField(data, "title")}
          style={{
            fontSize: `${notMain ? "32px" : ""}`,
            textTransform: `${notMain ? "initial" : "uppercase"}`,
            ...(match
              ? {
                  fontSize: `${notMain ? "20px" : ""}`,
                }
              : {}),
            ...(isMobile
              ? {
                  fontSize: `${notMain ? "18px" : ""}`,
                }
              : {}),
          }}
        >
          {title}
        </h1>
        <div className={styles.genderItem__inner}>
          {displayedGenders &&
            (isMobile ? displayedGenders : genders).map(
              (g, index) =>
                g &&
                !g.hidden &&
                (g.genderLink || g.genderUrl) && (
                  <motion.div
                    data-tina-field={tinaField(g)}
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    {g.genderLink || g.genderUrl ? (
                      <a
                        className={styles.projectCard}
                        href={getHref(g.genderLink || g.genderUrl)}
                        target={getTarget(g.genderUrl)}
                        download={getDownload(g.genderLink || g.genderUrl)}
                      >
                        {g.genderTitle && (
                          <h5 data-tina-field={tinaField(g, "genderTitle")}>
                            {g.genderTitle}
                          </h5>
                        )}
                        <Image />
                      </a>
                    ) : null}
                  </motion.div>
                )
            )}

          {watchMore && genders && genders.length > 9 && (isMobile as boolean) && (
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
