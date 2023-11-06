import styles from "./GenderEquality.module.scss";
import { PageComponentsGenderEquality } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "../../../assets/arrow-right.svg";
import Link from "next/link";

export const GenderEquality = ({
  data,
}: {
  data: PageComponentsGenderEquality;
}) => {
  const { title, gender: genders } = data;
  return (
    <main className={styles.gender}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.gender__inner}>
          {genders &&
            genders.map(
              (g, index) =>
                g &&
                !g.hidden &&
                g.genderLink && (
                  <div data-tina-field={tinaField(g)}>
                    <Link key={index} href={g.genderLink as string}>
                      <a className={styles.projectCard}>
                        <>
                          {g.genderTitle && (
                            <h5 data-tina-field={tinaField(g, "genderTitle")}>
                              {g.genderTitle}
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
