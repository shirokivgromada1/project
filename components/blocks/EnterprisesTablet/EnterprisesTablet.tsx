import styles from "./EnterprisesTablet.module.scss";
import { PageComponentsEnterprisesTablet } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
export const EnterprisesTablet = ({
  data,
}: {
  data: PageComponentsEnterprisesTablet;
}) => {
  const { title, enterprises: enterprises } = data;
  const isMobile = useBetterMediaQuery("(max-width: 531px)");
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  return (
    <main className={styles.enterprises}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.enterprises__inner}>
          {enterprises &&
            enterprises.map(
              (e, index) =>
                e &&
                !e?.isHidden &&
                e?.link && (
                  <Link
                    href={e.link}
                    data-tina-field={tinaField(e, "link")}
                    key={index}
                  >
                    <div className={styles.enterprises__inner_enterprise}>
                      {e?.name && (
                        <h3 data-tina-field={tinaField(e, "name")}>
                          {e?.name}
                        </h3>
                      )}
                    </div>
                  </Link>
                )
            )}
        </div>
      </div>
    </main>
  );
};
