import styles from "./ClinicService.module.scss";
import { tinaField } from "tinacms/dist/react";
import DownIcon from "@/assets/arrow-down-small.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";
import { PageComponentsClinicService } from "@/tina/__generated__/types";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export const ClinicService = ({
  data,
}: {
  data: PageComponentsClinicService;
}) => {
  const { title, servicess: services } = data;
  const isMobile = useBetterMediaQuery("(max-width: 640px)");
  const [selectedService, setSelectedService] = useState<number>(0);
  const hideImage = useBetterMediaQuery("(max-width: 1000px)");
  const handleServiceClick = (index: any) => {
    if (isMobile && index === selectedService) {
      setSelectedService(index);
    } else {
      setSelectedService(index);
    }
  };
  useEffect(() => {
    const updateSelectedService = () => {
      if (window.innerWidth < 640) {
        setSelectedService(3);
      } else {
        setSelectedService(0);
      }
    };
    updateSelectedService();
    window.addEventListener("resize", updateSelectedService);
    return () => {
      window.removeEventListener("resize", updateSelectedService);
    };
  }, []);

  return (
    <main className={styles.clinic}>
      <div className="container">
        {title && <h2 data-tina-field={tinaField(data, "title")}>{title}</h2>}
        <>
          {!isMobile && (
            <div className={styles.clinic__inner_desc}>
              {services && services[selectedService]?.description && (
                <div className={styles.clinic__inner_desc_content}>
                  <h4
                    data-tina-field={tinaField(
                      services[selectedService]?.description as any,
                      "descTitle"
                    )}
                  >
                    {services[selectedService]?.description?.descTitle}
                  </h4>
                  <ul>
                    {services &&
                      services[selectedService]?.description?.functions?.map(
                        (f, index) =>
                          f?.name ? (
                            <li
                              key={index}
                              data-tina-field={tinaField(f, "name")}
                            >
                              {f.name}
                            </li>
                          ) : null
                      )}
                  </ul>
                  <p
                    data-tina-field={tinaField(
                      services[selectedService]?.description as any,
                      "descSubtext"
                    )}
                  >
                    {services[selectedService]?.description?.descSubtext}{" "}

                    <span
                      data-tina-field={tinaField(
                        services[selectedService]?.description as any,
                        "descPhone"
                      )}
                    >
                      {services[selectedService]?.description?.descPhone}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
        </>
        <div className={styles.clinic__inner}>
          <div className={styles.clinic__inner_list}>
            {services &&
              services.map((s, index) => (
                <>
                  {!s?.isServiceHidden && s ? (
                    <div
                      key={index}
                      onClick={() => handleServiceClick(index)}
                      className={`${
                        index === selectedService ? styles.active : ""
                      } ${styles.clinic__inner_list_card}`}
                    >
                      <div>
                        {s?.icon && (
                          <img
                            src={s?.icon}
                            alt={s?.icon}
                            data-tina-field={tinaField(s, "icon")}
                          />
                        )}
                        {s?.title && (
                          <h5 data-tina-field={tinaField(s, "title")}>
                            {s.title}
                          </h5>
                        )}
                      </div>
                      {isMobile ? (
                        <DownIcon
                          className={`${
                            index == selectedService ? styles.active : ""
                          }`}
                        />
                      ) : null}
                    </div>
                  ) : null}
                  {isMobile && selectedService === index ? (
                    <div className={styles.clinic__inner_mobile}>
                      <div>
                        <h4
                          data-tina-field={tinaField(
                            services[selectedService]?.description as any,
                            "descTitle"
                          )}
                        >
                          {services[selectedService]?.description?.descTitle}
                        </h4>
                        {
                          <ul>
                            {services &&
                              services[
                                selectedService
                              ]?.description?.functions?.map((f, index) =>
                                f?.name ? (
                                  <li
                                    key={index}
                                    data-tina-field={tinaField(f, "name")}
                                  >
                                    {f.name}
                                  </li>
                                ) : null
                              )}
                          </ul>
                        }
                        <p
                          data-tina-field={tinaField(
                            services[selectedService]?.description as any,
                            "descSubtext"
                          )}
                        >
                          {services[selectedService]?.description?.descSubtext}{" "}
                          <span
                            data-tina-field={tinaField(
                              services[selectedService]?.description as any,
                              "descPhone"
                            )}
                          >
                            {services[selectedService]?.description?.descPhone}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
          </div>
          <>
            {!hideImage && (
              <div className={styles.clinic__inner_image}>
                {selectedService !== null && services && (
                  <Image
                    src={services[selectedService]?.image ?? ""}
                    height={400}
                    width={704}
                    data-tina-field={tinaField(
                      services[selectedService] as any,
                      "image"
                    )}
                  />
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </main>
  );
};
