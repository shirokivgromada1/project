import styles from "./DeputyCorpsTable.module.scss";
import { tinaField } from "tinacms/dist/react";
import ArrowDown from "@/assets/arrow-down-small.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PageComponentsDeputyCorpsTable } from "@/tina/__generated__/types";
import { margin } from "@mui/system";

export const DeputyCorpsTable = ({
  data,
}: {
  data: PageComponentsDeputyCorpsTable;
}) => {
  const { title, subtitle, deputy: deputies } = data;
  const match = useBetterMediaQuery("(max-width:800px)");
  const isMobile = useBetterMediaQuery("(max-width: 470px)");
  return (
    <main className={styles.corps}>
      <div className="container">
        <h1
          data-tina-field={tinaField(data, "title")}
          style={{
            marginBottom: match
              ? subtitle
                ? "10px"
                : "20px"
              : subtitle
              ? "10px"
              : "40px",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <h2 data-tina-field={tinaField(data, "subtitle")}>{subtitle}</h2>
        )}
        {!match ? (
          <table className={styles.corps__inner}>
            <thead>
              <tr>
                <th>ПІБ</th>
                <th>Посада</th>
                <th>Контакти</th>
              </tr>
            </thead>
            <tbody>
              {deputies &&
                deputies.map(
                  (d, index) =>
                    d &&
                    !d.hidden && (
                      <tr key={index}>
                        <td className={styles.corps__inner_name}>
                          <h5 data-tina-field={tinaField(d, "fullname")}>
                            {d?.fullname}
                          </h5>
                        </td>
                        <td className={styles.corps__inner_position}>
                          <p data-tina-field={tinaField(d, "position")}>
                            {d?.position}
                          </p>
                        </td>
                        <td className={styles.corps__inner_contacts}>
                          <p data-tina-field={tinaField(d, "phone")}>
                            {d?.phone}
                          </p>
                          <p data-tina-field={tinaField(d, "email")}>
                            {d?.email}
                          </p>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        ) : (
          <div className={styles.corps__inner}>
            {deputies &&
              deputies.map(
                (d, index) =>
                  d &&
                  !d.hidden && (
                    <div className={styles.corps__inner_item} key={index}>
                      <div>
                        <h4>{d?.position}</h4>
                        <p>{d?.fullname}</p>
                      </div>
                      <div className={styles.contacts}>
                        <h5>Контакти</h5>
                        <p>{d?.phone}</p>
                        <p>{d?.email}</p>
                      </div>
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </main>
  );
};
