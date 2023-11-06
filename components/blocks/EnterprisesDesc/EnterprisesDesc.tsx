import styles from "./EnterprisesDesc.module.scss";
import { PageComponentsEnterprisesDesc } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";

export const EnterprisesDesc = ({
  data,
}: {
  data: PageComponentsEnterprisesDesc;
}) => {
  const { title, desc, image, fullname, schedule, contacts, position } = data;
  const isMobile = useBetterMediaQuery("(max-width: 620px)");
  const isSmallMobile = useBetterMediaQuery("(max-width: 391px)");
  return (
    <main className={styles.enterprise}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.enterprise__inner}>
          <div className={styles.enterprise__inner_item}>
            <div
              className={styles.enterprise__inner_item_photo}
              data-tina-field={tinaField(data, "image")}
            >
              {image && (
                <Image
                  src={image}
                  width={isSmallMobile ? 350 : 305}
                  height={isSmallMobile ? 350 : 307}
                />
              )}
            </div>
            <div className={styles.enterprise__inner_item_desc}>
              {isMobile && position ? (
                <>
                  <h5 data-tina-field={tinaField(position, "title")}>
                    {position?.title}
                  </h5>
                  <p data-tina-field={tinaField(position, "name")}>
                    {position?.name}
                  </p>
                </>
              ) : null}
              {fullname && (
                <h4 data-tina-field={tinaField(data, "fullname")}>
                  {fullname}
                </h4>
              )}
              {isMobile &&
                desc?.children &&
                desc?.children.map((annItem: any, annIndex: number) => {
                  if (annItem.type.startsWith("h"))
                    return annItem.children.map((text: any) => (
                      <annItem.type
                        key={"announceHeadline" + annIndex}
                        style={{
                          fontWeight: text.bold && "bold",
                          fontStyle: text.italic && "italic",
                        }}
                        data-tina-field={tinaField(data, "desc")}
                      >
                        {text.text}
                      </annItem.type>
                    ));
                  if (annItem.type.startsWith("p"))
                    return annItem.children.map((text: any) => (
                      <p
                        key={"announceParagraph" + annIndex}
                        style={{
                          fontWeight: text.bold && "bold",
                          fontStyle: text.italic && "italic",
                        }}
                        data-tina-field={tinaField(data, "desc")}
                      >
                        {text.text}
                      </p>
                    ));
                  return null;
                })}
              {!isMobile && (
                <div>
                  {position && (
                    <h5 data-tina-field={tinaField(position, "title")}>
                      {position?.title}
                    </h5>
                  )}
                  {position && (
                    <p data-tina-field={tinaField(position, "name")}>
                      {position?.name}
                    </p>
                  )}
                </div>
              )}
              <div className={styles.enterprise__inner_item_mobschedule}>
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
                  {contacts && (
                    <p data-tina-field={tinaField(contacts, "place")}>
                      {contacts?.place}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className={styles.enterprise__inner_powers}>
              {desc?.children &&
                desc?.children.map((annItem: any, annIndex: number) => {
                  if (annItem.type.startsWith("h"))
                    return annItem.children.map((text: any) => (
                      <annItem.type
                        key={"announceHeadline" + annIndex}
                        style={{
                          fontWeight: text.bold && "bold",
                          fontStyle: text.italic && "italic",
                        }}
                        data-tina-field={tinaField(data, "desc")}
                      >
                        {text.text}
                      </annItem.type>
                    ));
                  {
                    console.log(annItem);
                  }
                  if (annItem.type.startsWith("p"))
                    return annItem.children.map((text: any) => (
                      <p
                        key={"announceParagraph" + annIndex}
                        style={{
                          fontWeight: text.bold && "bold",
                          fontStyle: text.italic && "italic",
                        }}
                        data-tina-field={tinaField(data, "desc")}
                      >
                        {text.text}
                      </p>
                    ));
                  return null;
                })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
