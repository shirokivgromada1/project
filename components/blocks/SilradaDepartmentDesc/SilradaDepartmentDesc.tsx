import styles from "./SilradaDepartmentDesc.module.scss";
import { PageComponentsSilradaDepartmentDesc } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";

export const SilradaDepartmentDesc = ({
  data,
}: {
  data: PageComponentsSilradaDepartmentDesc;
}) => {
  const { title, image, fullname, schedule, contacts, workplace, powers } =
    data;
  const isMobile = useBetterMediaQuery("(max-width: 531px)");
  return (
    <main className={styles.department}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.department__inner}>
          <div className={styles.department__inner_item}>
            <div
              className={styles.department__inner_item_photo}
              data-tina-field={tinaField(data, "image")}
            >
              {image && <Image src={image} width={366} height={367} />}
            </div>
            <div className={styles.department__inner_item_desc}>
              {fullname && (
                <h4 data-tina-field={tinaField(data, "fullname")}>
                  {fullname}
                </h4>
              )}
              {powers && isMobile ? (
                <p data-tina-field={tinaField(powers, "desc")}>
                  {powers?.desc}
                </p>
              ) : null}
              <div>
                {schedule && (
                  <h5 data-tina-field={tinaField(schedule, "title")}>
                    {schedule?.title}
                  </h5>
                )}
                {schedule && (
                  <p data-tina-field={tinaField(schedule, "time")}>
                    {schedule?.time}
                  </p>
                )}
              </div>
              <div>
                {contacts && (
                  <h5 data-tina-field={tinaField(contacts, "title")}>
                    {contacts?.title}
                  </h5>
                )}
                {contacts && (
                  <p data-tina-field={tinaField(contacts, "phone")}>
                    {contacts?.phone}
                  </p>
                )}
                {contacts && (
                  <p data-tina-field={tinaField(contacts, "email")}>
                    {contacts?.email}
                  </p>
                )}
              </div>
              <div>
                {workplace && (
                  <h5 data-tina-field={tinaField(workplace, "title")}>
                    {workplace?.title}
                  </h5>
                )}
                {workplace && (
                  <p data-tina-field={tinaField(workplace, "place")}>
                    {workplace?.place}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.department__inner_powers}>
            {powers && (
              <h3 data-tina-field={tinaField(powers, "title")}>
                {powers?.title}
              </h3>
            )}
            {powers && (
              <p data-tina-field={tinaField(powers, "desc")}>{powers?.desc}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
