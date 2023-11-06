import React from "react";
import ScrollToTop from "react-scroll-to-top";
import { HiArrowNarrowUp } from "react-icons/hi";
import styles from "./VacancyCard.module.scss";
import Link from "next/link";
import LeftArrowIcon from "./../../../assets/pagination-left-arrow.svg";
import { Vacancies } from "@/tina/__generated__/types";
import Image from "next/image";
import { useImageSize } from "react-image-size";
import { format } from "date-fns";
import { tinaField } from "tinacms/dist/react";

export const VacancyCard = ({
  data,
}: {
  data: Omit<Vacancies, "id" | "_sys" | "__typename" | "_values">;
}) => {
  const [dimensions] = useImageSize(data.image as string);

  console.log("data.contactsInfo", data.contactsInfo);
  return (
    <>
      <main className={styles.vacanciesCard}>
        <div className={styles.vacanciesCard__backward}>
          <Link href={"/vacancies"}>
            <a>
              <LeftArrowIcon />
            </a>
          </Link>
        </div>
        <div className={styles.vacanciesCard__wrapper}>
          <div className={styles.vacanciesCard__wrapper_title}>
            <h1 data-tina-field={tinaField(data, "title")}>{data.title}</h1>
          </div>
          {data.image && (
            <div
              className={styles.vacanciesCard__wrapper_image}
              data-tina-field={tinaField(data, "image")}
            >
              <Image
                src={data.image}
                alt="Preview Image"
                width={Math.min(
                  (dimensions?.width && dimensions?.width) || 600,
                  600
                )}
                height={Math.min(
                  (dimensions?.height && dimensions?.height) || 300,
                  300
                )}
              />
            </div>
          )}
          {data.announceTitle && (
            <div
              className={styles.vacanciesCard__wrapper_announceTitle}
              data-tina-field={tinaField(data, "announceTitle")}
            >
              {data.announceTitle.children.map(
                (annItem: any, annIndex: number) => {
                  if (annItem.type.startsWith("h"))
                    return annItem.children.map((text: any) => (
                      <annItem.type
                        key={"announceHeadline" + annIndex}
                        style={{
                          fontWeight: text.bold && "bold",
                          fontStyle: text.italic && "italic",
                        }}
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
                      >
                        {text.text}
                      </p>
                    ));
                  return null;
                }
              )}
            </div>
          )}
          {data.description && (
            <div
              className={styles.vacanciesCard__wrapper_description}
              data-tina-field={tinaField(data, "description")}
            >
              {data.description.children.map(
                (descItem: any, descIndex: number) => {
                  console.log("descItem", descItem);
                  if (descItem.type.startsWith("h")) {
                    return descItem.children.map((text: any) => (
                      <descItem.type
                        key={"descriptionHeadline" + descIndex}
                        style={{
                          fontWeight: text.bold && "bold",
                          fontStyle: text.italic && "italic",
                        }}
                      >
                        {text.text}
                      </descItem.type>
                    ));
                  }

                  if (descItem.type.startsWith("p"))
                    return descItem.children.map((text: any) => {
                      if (text.type === "img")
                        return <img src={text.url} alt="descriptionImage" />;
                      return (
                        <p
                          key={"descriptionParagraph" + descIndex}
                          style={{
                            fontWeight: text.bold && "bold",
                            fontStyle: text.italic && "italic",
                          }}
                        >
                          {text.text}
                        </p>
                      );
                    });
                  if (descItem.type.startsWith("ul"))
                    return (
                      <ul key={"list" + descIndex}>
                        {descItem.children.map((li: any, liIndex: number) => {
                          return li.children.map((lic: any) => {
                            return lic.children.map((text: any) => (
                              <li
                                style={{
                                  fontWeight: text.bold && "bold",
                                  fontStyle: text.italic && "italic",
                                }}
                              >
                                {text.text}
                              </li>
                            ));
                          });
                        })}
                      </ul>
                    );
                  return null;
                }
              )}
            </div>
          )}
          <div
            className={styles.vacanciesCard__wrapper_contactsInfo}
            data-tina-field={tinaField(data, "contactsInfo")}
          >
            {data.contactsInfo.children.map(
              (descItem: any, descIndex: number) => {
                if (descItem.type.startsWith("h")) {
                  return descItem.children.map((text: any) => (
                    <descItem.type
                      key={"descriptionHeadline" + descIndex}
                      style={{
                        fontWeight: text.bold && "bold",
                        fontStyle: text.italic && "italic",
                      }}
                    >
                      {text.text}
                    </descItem.type>
                  ));
                }

                if (descItem.type.startsWith("p"))
                  return descItem.children.map((text: any) => (
                    <p
                      key={"descriptionParagraph" + descIndex}
                      style={{
                        fontWeight: text.bold && "bold",
                        fontStyle: text.italic && "italic",
                      }}
                    >
                      {text.text}
                    </p>
                  ));
                if (descItem.type.startsWith("ul"))
                  return (
                    <ul key={"list" + descIndex}>
                      {descItem.children.map((li: any, liIndex: number) => {
                        return li.children.map((lic: any) => {
                          return lic.children.map((text: any) => (
                            <li
                              style={{
                                fontWeight: text.bold && "bold",
                                fontStyle: text.italic && "italic",
                              }}
                            >
                              {text.text}
                            </li>
                          ));
                        });
                      })}
                    </ul>
                  );
                return null;
              }
            )}
          </div>
          {data.pubDate && (
            <div
              className={styles.vacanciesCard__wrapper_pubDate}
              data-tina-field={tinaField(data, "pubDate")}
            >
              {format(new Date(data.pubDate), "dd.MM.yyyy HH:mm")}
            </div>
          )}
        </div>
      </main>
      <ScrollToTop
        smooth
        component={<HiArrowNarrowUp />}
        color="#309C54"
        className={styles.buttonTop}
      />
    </>
  );
};
