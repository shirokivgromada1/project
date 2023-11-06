import styles from "./Officially.module.scss";
import { tinaField } from "tinacms/dist/react";
import Image from "../../../assets/arrow-right.svg";
import { PageComponentsOfficially } from "@/tina/__generated__/types";
import Link from "next/link";

export const Officially = ({ data }: { data: PageComponentsOfficially }) => {
  const { title, official: official } = data;
  return (
    <main className={styles.officially}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.officially__inner}>
          {official &&
            official.map(
              (o, index) =>
                o &&
                !o.hidden &&
                o.link && (
                  <Link href={o.link as string}>
                    <a
                      key={index}
                      className={styles.officially__inner_item}
                      target={
                        (o.link && o.link.startsWith("http")) ||
                        (o.link && o.link.startsWith("https"))
                          ? "_blank"
                          : ""
                      }
                      rel="noopener noreferrer"
                      data-tina-field={tinaField(o, "link")}
                    >
                      <div />
                      {o.title && (
                        <h5 data-tina-field={tinaField(o, "title")}>
                          {o.title}{" "}
                          {o.richText && (
                            <span data-tina-field={tinaField(o, "richText")}>
                              {o.richText}
                            </span>
                          )}
                        </h5>
                      )}
                    </a>
                  </Link>
                )
            )}
        </div>
      </div>
    </main>
  );
};
