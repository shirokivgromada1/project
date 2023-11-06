import styles from "./CurrentPrograms.module.scss";
import { PageComponentsCurrentPrograms } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";

export const CurrentPrograms = ({
  data,
}: {
  data: PageComponentsCurrentPrograms;
}) => {
  const { title, program: programs } = data;
  const match = useBetterMediaQuery("(max-width: 850px)");
  const isMobile = useBetterMediaQuery("(max-width: 440px)");
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
    <main className={styles.programs}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        {!match ? (
          <table className={styles.programs__inner}>
            <thead>
              <tr>
                <th>Назва Програми</th>
                <th>Дата прийняття</th>
                <th>Посилання</th>
              </tr>
            </thead>
            <tbody>
              {programs &&
                programs.map(
                  (p, index) =>
                    p &&
                    !p.hidden && (
                      <tr key={index} data-tina-field={tinaField(p)}>
                        <td className={styles.programs__inner_name}>
                          <h5
                            key={index}
                            data-tina-field={tinaField(p, "name")}
                          >
                            {p?.name}
                          </h5>
                        </td>
                        <td className={styles.programs__inner_date}>
                          <h5 data-tina-field={tinaField(p, "date")}>
                            {p?.date}
                          </h5>
                        </td>
                        <td className={styles.programs__inner_link}>
                          {p.link || p.url ? (
                            <a
                              href={getHref(p.link || p.url)}
                              target={getTarget(p.url)}
                              download={getDownload(p.link || p.url)}
                              data-tina-field={tinaField(p, "buttonText")}
                            >
                              {!match ? (
                                p?.buttonText || "Завантажити"
                              ) : (
                                <DownloadIcon />
                              )}
                            </a>
                          ) : null}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        ) : (
          <div className={styles.programs__inner}>
            {programs &&
              programs.map(
                (p, index) =>
                  p &&
                  !p.hidden && (
                    <div className={styles.program}>
                      <div className={styles.program__desc}>
                        <h5>
                          {isMobile ? (
                            <>
                              <p>{p?.date?.split(" ").slice(0, 3).join(" ")}</p>
                              <p>{p?.date?.split(" ").slice(3).join(" ")}</p>
                            </>
                          ) : (
                            <>{p?.date}</>
                          )}
                        </h5>
                        <p>{p?.name}</p>
                      </div>
                      {p.link || p.url ? (
                        <a
                          href={getHref(p.link || p.url)}
                          target={getTarget(p.url)}
                          download={getDownload(p.link || p.url)}
                        >
                          <DownloadIcon />
                        </a>
                      ) : null}
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </main>
  );
};
