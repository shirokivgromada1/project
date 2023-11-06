import styles from "./Documents.module.scss";
import { PageComponentsDocuments } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";

export const Documents = ({ data }: { data: PageComponentsDocuments }) => {
  const { title, document: documents } = data;
  return (
    <main className={styles.documents}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.documents__inner}>
          {documents &&
            documents.map(
              (d, index) =>
                d &&
                !d.hidden &&
                d.link && (
                  <Link href={d.link as string}>
                    <a
                      data-tina-field={tinaField(d)}
                      className={styles.document}
                      key={index}
                    >
                      {d.title && <h5>{d.title}</h5>}
                    </a>
                  </Link>
                )
            )}
        </div>
      </div>
    </main>
  );
};
