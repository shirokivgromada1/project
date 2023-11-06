import styles from "./DeputyHeadTablet.module.scss";
import { PageComponentsDeputyHeadTablet } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
export const DeputyHeadTablet = ({
  data,
}: {
  data: PageComponentsDeputyHeadTablet;
}) => {
  const { title, deputy: deputies } = data;
  const isMobile = useBetterMediaQuery("(max-width: 531px)");
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  return (
    <main className={styles.deputies}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.deputies__inner}>
          {deputies &&
            deputies.map(
              (d, index) =>
                d &&
                !d?.isHidden &&
                d?.link && (
                  <Link
                    href={d?.link}
                    data-tina-field={tinaField(d, "link")}
                    key={index}
                  >
                    <div className={styles.deputies__inner_deputy}>
                      <div className={styles.deputies__inner_deputy_photo}>
                        {d?.image && (
                          <Image
                            src={d?.image}
                            width={isTablet ? 329 : 329}
                            height={isTablet ? 320 : 320}
                            data-tina-field={tinaField(d, "image")}
                          />
                        )}
                      </div>
                      <div className={styles.deputies__inner_deputy_desc}>
                        {d?.position && (
                          <h3 data-tina-field={tinaField(d, "position")}>
                            {d?.position}
                          </h3>
                        )}
                        {d?.fullname && (
                          <p data-tina-field={tinaField(d, "fullname")}>
                            {d?.fullname}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )
            )}
        </div>
      </div>
    </main>
  );
};
