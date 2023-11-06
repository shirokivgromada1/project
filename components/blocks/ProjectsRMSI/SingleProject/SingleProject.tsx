import styles from "./SingleProject.module.scss";
import { PageComponentsRmsi } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "../../../../assets/arrow-right.svg";
import Link from "next/link";

export const SingleProject = ({ data }: { data: PageComponentsRmsi }) => {
  const { title, project: projects } = data;
  return (
    <main className={styles.projectRMSI}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.projectRMSI__inner}>
          {projects &&
            projects.map(
              (p, index) =>
                p &&
                !p.hidden &&
                p.projectLink && (
                  <div data-tina-field={tinaField(p)}>
                    <Link key={index} href={p.projectLink as string}>
                      <a
                        className={styles.projectCard}
                        data-tina-field={tinaField(p, "projectLink")}
                      >
                        <>
                          {p.projectTitle && (
                            <h5 data-tina-field={tinaField(p, "projectTitle")}>
                              {p.projectTitle}
                            </h5>
                          )}
                          <Image />
                        </>
                      </a>
                    </Link>
                  </div>
                )
            )}
        </div>
      </div>
    </main>
  );
};
