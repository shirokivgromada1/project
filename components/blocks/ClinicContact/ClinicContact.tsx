import styles from "./ClinicContact.module.scss";
import { tinaField } from "tinacms/dist/react";
import DownloadIcon from "@/assets/download-icon.svg";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";
import { PageComponentsClinicContact } from "@/tina/__generated__/types";

export const ClinicContact = ({
  data,
}: {
  data: PageComponentsClinicContact;
}) => {
  const {
    title,
    schedule: schedule,
    address: address,
    socials: socials,
    isHidden,
  } = data;
  return (
    <>
      {!isHidden && (
        <main className={styles.contact}>
          <div className="container">
            {title && (
              <h2 data-tina-field={tinaField(data, "title")}>{title}</h2>
            )}
            <div className={styles.contact__inner}>
              <div className={styles.contact__inner_schedule}>
                <div>
                  {schedule?.scheduleLogo && (
                    <Image
                      src={schedule.scheduleLogo}
                      width={50}
                      height={50}
                      data-tina-field={tinaField(schedule, "scheduleLogo")}
                    />
                  )}
                </div>
                {schedule && (
                  <div className={styles.contact__inner_schedule_desc}>
                    <div>
                      <h5
                        data-tina-field={tinaField(schedule, "scheduleTitle")}
                      >
                        {schedule?.scheduleTitle}
                      </h5>
                      <p
                        data-tina-field={tinaField(schedule, "schedulePhones")}
                      >
                        {schedule?.schedulePhones}
                      </p>
                    </div>
                    <div>
                      <h5
                        data-tina-field={tinaField(schedule, "schedulePropose")}
                      >
                        {schedule?.schedulePropose}
                      </h5>
                      {schedule?.schedulePropose && (
                        <p
                          data-tina-field={tinaField(schedule, "proposePhones")}
                        >
                          {schedule?.proposePhones}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.contact__inner_address}>
                <div>
                  {address?.logo && (
                    <Image
                      src={address.logo}
                      width={50}
                      height={50}
                      data-tina-field={tinaField(address, "logo")}
                    />
                  )}
                </div>
                {address && (
                  <div className={styles.contact__inner_address_desc}>
                    <h5 data-tina-field={tinaField(address, "title")}>
                      {address?.title}
                    </h5>
                    <p data-tina-field={tinaField(address, "street")}>
                      {address?.street}
                    </p>
                    {address?.url && (
                      <a
                        href={address?.url}
                        target="_blank"
                        data-tina-field={tinaField(address, "buttonText")}
                      >
                        {address?.buttonText}
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.contact__inner_socials}>
                <div>
                  {socials?.logo && (
                    <Image
                      src={socials.logo}
                      width={50}
                      height={50}
                      className={styles.img}
                      data-tina-field={tinaField(socials, "logo")}
                    />
                  )}
                </div>
                <div className={styles.contact__inner_socials_desc}>
                  {socials && (
                    <h5 data-tina-field={tinaField(socials, "title")}>
                      {socials?.title}
                    </h5>
                  )}
                  <div className={styles.contact__inner_socials_items}>
                    {socials?.socialList &&
                      socials.socialList.map((s, index) => (
                        <>
                          {s && (
                            <div
                              key={index}
                              data-tina-field={tinaField(s, "icon")}
                            >
                              {s?.icon && (
                                <Image src={s.icon} width={22} height={22} />
                              )}
                              <span data-tina-field={tinaField(s, "name")}>
                                {s?.name}
                              </span>
                            </div>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
