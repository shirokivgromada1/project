import styles from "./SocialServicesCenter.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsSocialServicesCenter } from "@/tina/__generated__/types";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";

export const SocialServicesCenter = ({
  data,
}: {
  data: PageComponentsSocialServicesCenter;
}) => {
  const { title, subtitle, taxiTitle, taxiSubtitle, service: services } = data;
  const match = useBetterMediaQuery("(max-width: 768px)");
  const isDesktop = useBetterMediaQuery("(min-width: 769px)");
  const isMobile = useBetterMediaQuery("(max-width: 390px)");
  return (
    <main className={styles.center}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        {subtitle && (
          <h2 data-tina-field={tinaField(data, "subtitle")}>{subtitle}</h2>
        )}
        <div className={styles.center__inner}>
          {services &&
            services.map(
              (o, index) =>
                o &&
                !o.hidden && (
                  <div className={styles.center__inner_item} key={index}>
                    <div className={styles.center__inner_item_desc}>
                      <div>
                        <h3 data-tina-field={tinaField(o, "title")}>
                          <div />
                          {o.title}
                        </h3>
                        <p data-tina-field={tinaField(o, "desc")}>{o.desc}</p>
                        {isDesktop ? (
                          <h5 data-tina-field={tinaField(o, "contacts")}>
                            {o.contacts}
                          </h5>
                        ) : null}
                      </div>
                      <ul>
                        {o.functions &&
                          o.functions.map(
                            (f, index) =>
                              f &&
                              !f.hidden && (
                                <li
                                  key={index}
                                  data-tina-field={tinaField(
                                    f,
                                    "singleFunction"
                                  )}
                                >
                                  {f.singleFunction}
                                </li>
                              )
                          )}
                      </ul>
                    </div>
                    {!isDesktop ? (
                      <h5 data-tina-field={tinaField(o, "contacts")}>
                        {o.contacts}
                      </h5>
                    ) : null}
                  </div>
                )
            )}
          <div className={styles.center__inner_taxi}>
            <h2 data-tina-field={tinaField(data, "taxiTitle")}>{taxiTitle}</h2>
            <h4 data-tina-field={tinaField(data, "taxiSubtitle")}>
              {taxiSubtitle}
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
};
