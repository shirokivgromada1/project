import styles from "./AdministrativeServicesEmployees.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsAdministrativeServicesEmployees } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";

export const AdministrativeServicesEmployees = ({
  data,
}: {
  data: PageComponentsAdministrativeServicesEmployees;
}) => {
  const { title, employee: employees } = data;
  const match = useBetterMediaQuery("(max-width: 768px)");
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const isMobile = useBetterMediaQuery("(max-width: 390px)");
  return (
    <main className={styles.employees}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.employees__inner}>
          {employees &&
            employees.map((e, index) => (
              <>
                {!e?.hidden && e && (
                  <div className={styles.employees__inner_item}>
                    {e?.photo && (
                      <Image
                        src={e.photo}
                        width={406}
                        height={406}
                        data-tina-field={tinaField(e, "photo")}
                      />
                    )}
                    <div className={styles.employees__inner_item_info}>
                      <div
                        className={styles.employees__inner_item_info_fullname}
                      >
                        <h4 data-tina-field={tinaField(e, "fullname")}>
                          {e?.fullname}
                        </h4>
                        <p data-tina-field={tinaField(e, "district")}>
                          {e?.district}
                        </p>
                      </div>
                      {isTablet ? <h5>Контакти</h5> : null}
                      {isTablet ? (
                        <>
                          {e?.phone && (
                            <div
                              className={
                                styles.employees__inner_item_info_phone
                              }
                            >
                              <span>Телефон: {e?.phone}</span>
                            </div>
                          )}
                          {e?.email && (
                            <div
                              className={
                                styles.employees__inner_item_info_address
                              }
                            >
                              <span>e-mail: {e?.email}</span>
                            </div>
                          )}
                          {e?.address && (
                            <div
                              className={
                                styles.employees__inner_item_info_address
                              }
                            >
                              <span>Адреса: {e?.address}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div
                            className={styles.employees__inner_item_info_phone}
                          >
                            <span>Телефон: </span>
                            <span data-tina-field={tinaField(e, "phone")}>
                              {e?.phone}
                            </span>
                          </div>
                          <div
                            className={
                              styles.employees__inner_item_info_address
                            }
                          >
                            <span>Адреса</span>
                            <span data-tina-field={tinaField(e, "address")}>
                              {e?.address}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </main>
  );
};
