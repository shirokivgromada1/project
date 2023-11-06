import styles from "./Footer.module.scss";
import Image from "next/image";
import { GlobalFooter, Maybe } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import Facebook from "./../../../assets/facebook.svg";
import Instagram from "./../../../assets/instagram.svg";
import Telegram from "./../../../assets/telegram.svg";

const Footer = ({ data }: { data: Maybe<GlobalFooter> | undefined }) => {
  if (data) {
    const {
      logo,
      headline,
      nav,
      location,
      googleUrl,
      workTime,
      phone,
      social,
    } = data;
    if (logo)
      return (
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footer__site}>
              <Image
                src={logo}
                alt="logo"
                height={88}
                width={165}
                data-tina-field={tinaField(data, "logo")}
              />

              <h5 data-tina-field={tinaField(data, "headline")}>{headline}</h5>
              <div>
                <button type="button" className={styles.footer__site_button}>
                  Наш інвестиційний сайт
                </button>
              </div>
            </div>
            <nav className={styles.footer__nav}>
              <h1>Навігація</h1>
              <ul>
                {nav?.map(
                  (link, index) =>
                    link &&
                    link.href && (
                      <a
                        href={link.href}
                        key={link.label + index}
                        data-tina-field={tinaField(link)}
                      >
                        <li>{link.label}</li>
                      </a>
                    )
                )}
              </ul>
            </nav>
            <div className={styles.footer__contacts}>
              <h1>Контакти</h1>
              <h5 data-tina-field={tinaField(data, "location")}>{location}</h5>
              {googleUrl && (
                <div className={styles.footer__contacts_showOnMap}>
                  <Link href={googleUrl}>
                    <a>Показати на мапі</a>
                  </Link>
                </div>
              )}
              <h4 data-tina-field={tinaField(data, "workTime")}>
                &quot;ГАРЯЧА ЛІНІЯ&quot;: <br className={styles.mobile} />{" "}
                {workTime}
                <br />{" "}
                <a
                  href={`tel:+38${phone}`}
                  data-tina-field={tinaField(data, "phone")}
                >
                  {phone}
                </a>
              </h4>
              <div className={styles.footer__socials}>
                {social?.facebook && (
                  <a
                    href={social?.facebook}
                    data-tina-field={tinaField(social, "facebook")}
                  >
                    <Facebook />
                  </a>
                )}
                {social?.instagram && (
                  <a
                    href={social?.instagram}
                    data-tina-field={tinaField(social, "instagram")}
                  >
                    <Instagram />
                  </a>
                )}
                {social?.telegram && (
                  <a
                    href={social?.telegram}
                    data-tina-field={tinaField(social, "telegram")}
                  >
                    <Telegram />
                  </a>
                )}
              </div>
              <div className={styles.mobile__block}>
                <button type="button" className={styles.footer__site_button}>
                  Наш інвестиційний сайт
                </button>
              </div>
            </div>
          </div>
        </footer>
      );
  }
};

export default Footer;
