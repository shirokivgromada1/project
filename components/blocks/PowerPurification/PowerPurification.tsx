import styles from "./PowerPurification.module.scss";
import { tinaField } from "tinacms/dist/react";
import ArrowDown from "@/assets/arrow-down-small.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import { PageComponentsPowerPurification } from "@/tina/__generated__/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const PowerPurification = ({
  data,
}: {
  data: PageComponentsPowerPurification;
}) => {
  const { title, power: powers } = data;
  const match = useBetterMediaQuery("(max-width:768px)");
  const isMobile = useBetterMediaQuery("(max-width: 470px)");
  function isPdf(url: string | undefined): boolean {
    return typeof url === "string" && url.toLowerCase().endsWith(".pdf");
  }
  const [isOpen, setIsOpen] = useState(false);

  const [openItems, setOpenItems] = useState(
    new Array(powers?.length).fill(false)
  );

  const toggleAccordion = (index: number) => {
    const newOpenItems = [...openItems];
    newOpenItems[index] = !newOpenItems[index];
    setOpenItems(newOpenItems);
  };
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
    <main className={styles.power}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        {!match ? (
          <table className={styles.power__inner}>
            <thead>
              <tr>
                <th>Прізвище, ім’я, по батькові посада</th>
                <th>Дата початку проведення перевірки</th>
                <th>Висновок про результати перевірки</th>
              </tr>
            </thead>
            <tbody>
              {powers &&
                powers.map(
                  (p, index) =>
                    p &&
                    !p.hidden &&
                    p?.person && (
                      <tr key={index}>
                        <td className={styles.power__inner_name}>
                          <h5
                            data-tina-field={tinaField(p?.person, "fullname")}
                          >
                            {p?.person?.fullname}
                          </h5>
                          <h5
                            data-tina-field={tinaField(p?.person, "position")}
                          >
                            {p?.person?.position}
                          </h5>
                        </td>
                        <td className={styles.power__inner_date}>
                          {p?.date?.declarationLink ||
                          p?.date?.declarationUrl ? (
                            <a
                              href={getHref(
                                p?.date?.declarationLink ||
                                  p?.date?.declarationUrl
                              )}
                              target={getTarget(p?.date?.declarationUrl)}
                              download={getDownload(
                                p?.date?.declarationLink ||
                                  p?.date?.declarationUrl
                              )}
                              data-tina-field={tinaField(
                                p?.date,
                                "declarationTitle"
                              )}
                            >
                              {p?.date?.declarationTitle}
                            </a>
                          ) : null}
                        </td>
                        <td className={styles.power__inner_summary}>
                          <p data-tina-field={tinaField(p, "summary")}>
                            {p?.summary}
                          </p>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        ) : (
          <div className={styles.power__inner}>
            <div className={styles.power__inner_headline}>
              <h2>Прізвище, ім’я, по батькові посада</h2>
              <h2>Дата початку проведення перевірки</h2>
            </div>
            {powers &&
              powers.map(
                (p, index) =>
                  p &&
                  !p.hidden && (
                    <div className={styles.power__inner_item} key={index}>
                      <div>
                        <h5>{p?.person?.fullname}</h5>
                        <h5>{p?.person?.position}</h5>
                      </div>
                      {p?.date?.declarationLink || p?.date?.declarationUrl ? (
                        <a
                          href={getHref(
                            p?.date?.declarationLink || p?.date?.declarationUrl
                          )}
                          target={getTarget(p?.date?.declarationUrl)}
                          download={getDownload(
                            p?.date?.declarationLink || p?.date?.declarationUrl
                          )}
                        >
                          {p?.date?.declarationTitle}
                        </a>
                      ) : null}
                      <div className={styles.summary}>
                        <AnimatePresence>
                          {openItems[index] && (
                            <motion.div
                              className={styles.summary__hidden}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <p>{p?.summary}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div
                          className={styles.summary__button}
                          onClick={() => toggleAccordion(index)}
                        >
                          <h5>Висновок</h5>
                          <motion.div
                            initial={false}
                            animate={{
                              rotate: openItems[index] ? 180 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            <ArrowDown height={isMobile ? 25 : 35} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </main>
  );
};
