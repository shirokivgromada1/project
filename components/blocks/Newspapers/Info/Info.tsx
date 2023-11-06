import {
  DepartmentPeopleComponentsNewspapersInfo,
  PageComponentsNewspapersInfo,
} from "@/tina/__generated__/types";
import React from "react";
import styles from "./Info.module.scss";
import classNames from "classnames";

export const NewspapersInfo = ({
  data,
}: {
  data: PageComponentsNewspapersInfo | DepartmentPeopleComponentsNewspapersInfo;
}) => {
  const { titleInfo, descriptionInfo, contactsInfo, servicesCost } = data;

  return (
    <div className={classNames("container", styles.wrapper)}>
      <div className={styles.newspaper__publication}>
        <div className={styles.newspaper__publication_add}>
          <h1>{titleInfo}</h1>
          {descriptionInfo.children.map((child: any, childIndex: number) => {
            console.log("child", child);
            if (child.type.startsWith("h"))
              return child.children.map((text: any, textIndex: number) => (
                <child.type key={"descriptionInfo" + textIndex}>
                  {text.text}
                </child.type>
              ));
            if (child.type === "p")
              return child.children.map((text: any, textIndex: number) => (
                <p key={"descriptionInfo" + textIndex}>{text.text}</p>
              ));
          })}
          {contactsInfo?.map((contactInfo: any) => {
            if (contactInfo.contact.includes("+"))
              return (
                <a href={`tel:${contactInfo.contact}`}>{contactInfo.contact}</a>
              );
            if (contactInfo.contact.includes("@"))
              return (
                <a href={`mailto:${contactInfo.contact}`}>
                  {contactInfo.contact}
                </a>
              );
          })}
        </div>
        <div className={styles.newspaper__publication_cost}>
          <h5>Вартість послуг</h5>
          <ul>
            {servicesCost?.map((service, index) => (
              <li key={"cost" + index}>
                {service?.name} — {service?.cost} гривень
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
