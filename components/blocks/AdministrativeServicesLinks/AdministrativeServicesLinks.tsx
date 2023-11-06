import styles from "./AdministrativeServicesLinks.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsAdministrativeServicesLinks } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";
import DownIcon from "../../../assets/arrow-down.svg";
import DownIconTablet from "../../../assets/arrow-down-small.svg";
import { useState } from "react";
import DownloadIcon from "@/assets/download-icon.svg";
import { motion, AnimatePresence } from "framer-motion";
export const AdministrativeServicesLinks = ({
  data,
}: {
  data: PageComponentsAdministrativeServicesLinks;
}) => {
  const { title, link: links } = data;
  const match = useBetterMediaQuery("(max-width: 768px)");
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const isMobile = useBetterMediaQuery("(max-width: 391px)");
  const [link, setLink] = useState<null | number>(null);
  const handleLinkClick = (number: number) => {
    if (number === link) {
      setLink(null);
    } else {
      setLink(number);
    }
  };

  return (
    <main className={styles.links}>
      <div className="container">
        <h2 data-tina-field={tinaField(data, "title")}>{title}</h2>
        <div className={styles.links__inner}>
          {links &&
            links.map((l, index) => (
              <>
                {l && !l.hidden && (
                  <div className={styles.links__inner_link}>
                    <div
                      className={`${link === index ? styles.active : ""} ${
                        styles.links__inner_link_title
                      }`}
                      onClick={() => handleLinkClick(index)}
                    >
                      <h3 data-tina-field={tinaField(l, "title")}>{l.title}</h3>
                      {isTablet ? <DownIconTablet /> : <DownIcon />}
                    </div>
                    <AnimatePresence initial={false}>
                      {link === index && (
                        <motion.ul
                          className={`${link === index ? styles.clicked : ""} ${
                            styles.links__inner_link_list
                          }`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {l.list?.map((i, index) => (
                            <>
                              {i && i?.link && (
                                <li key={index} data-tina-field={tinaField(i)}>
                                  <a
                                    href={i.link}
                                    target="_blank"
                                    data-tina-field={tinaField(i, "link")}
                                  >
                                    <p data-tina-field={tinaField(i, "title")}>
                                      <span>{index + 1}.</span>
                                      <span>{i.title}</span>
                                    </p>
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
