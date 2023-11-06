import styles from "./CouncilSecretaryDesc.module.scss";
import { PageComponentsCouncilSecretaryDesc } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Inst from "../../../assets/instagram.svg";
import Telegram from "../../../assets/telegram.svg";
import Facebook from "../../../assets/facebook.svg";
import Phone from "../../../assets/phone-icon.svg";
export const CouncilSecretaryDesc = ({
  data,
}: {
  data: PageComponentsCouncilSecretaryDesc;
}) => {
  const {
    title,
    image,
    fullname,
    schedule,
    contacts,
    employment: employments,
  } = data;
  const isMobile = useBetterMediaQuery("(max-width: 531px)");
  const isTablet = useBetterMediaQuery("(max-width: 1115px)");
  return (
    <main className={styles.secretary}>
      <div className="container">
        <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
        <div className={styles.secretary__inner}>
          <div className={styles.secretary__inner_photo}>
            {image && (
              <Image
                src={image}
                width={isTablet ? 400 : 451}
                height={isTablet ? 400 : 553}
                data-tina-field={tinaField(data, "image")}
              />
            )}
          </div>
          <div className={styles.secretary__inner_info}>
            {fullname && (
              <h3 data-tina-field={tinaField(data, "fullname")}>{fullname}</h3>
            )}
            <ul>
              {employments && (
                <p data-tina-field={tinaField(employments, "title")}>
                  {employments?.title}
                </p>
              )}
              {employments &&
                employments?.item?.map(
                  (e, index) =>
                    e && (
                      <li key={index} data-tina-field={tinaField(e, "desc")}>
                        {e.desc}
                      </li>
                    )
                )}
            </ul>
            <div className={styles.secretary__inner_details}>
              <div className={styles.secretary__inner_details_schedule}>
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
              {!!isTablet && contacts?.title && (
                <h5 data-tina-field={tinaField(contacts, "title")}>
                  {contacts?.title}
                </h5>
              )}
              <div className={styles.secretary__inner_details_contacts}>
                <div>
                  {!isTablet && contacts?.title && (
                    <h5 data-tina-field={tinaField(contacts, "title")}>
                      {contacts?.title}
                    </h5>
                  )}
                  <div>
                    <div>
                      {contacts?.phone1 && (
                        <span data-tina-field={tinaField(contacts, "phone1")}>
                          <Phone />
                          {contacts?.phone1}
                        </span>
                      )}
                      {contacts?.phone2 && (
                        <span data-tina-field={tinaField(contacts, "phone2")}>
                          <Phone />
                          {contacts?.phone2}
                        </span>
                      )}
                    </div>
                    <div>
                      {contacts?.place && (
                        <p data-tina-field={tinaField(contacts, "place")}>
                          {contacts?.place}
                        </p>
                      )}
                      {contacts?.email && (
                        <p data-tina-field={tinaField(contacts, "email")}>
                          {contacts?.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {contacts?.facebook && (
                    <a
                      href={contacts.facebook}
                      target="_blank"
                      data-tina-field={tinaField(contacts, "facebook")}
                    >
                      <Facebook />
                    </a>
                  )}
                  {contacts?.inst && (
                    <a
                      href={contacts.inst}
                      target="_blank"
                      data-tina-field={tinaField(contacts, "inst")}
                    >
                      <Inst />
                    </a>
                  )}
                  {contacts?.telegram && (
                    <a
                      href={contacts.telegram}
                      target="_blank"
                      data-tina-field={tinaField(contacts, "telegram")}
                    >
                      <Telegram />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
