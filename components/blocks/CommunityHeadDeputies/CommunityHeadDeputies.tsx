import styles from "./CommunityHeadDeputies.module.scss";
import { PageComponentsCommunityHeadDeputies } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
import ArrowDown from "../../../assets/arrow-down.svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animateScroll as scrolle } from "react-scroll";
export const CommunityHeadDeputies = ({
  data,
}: {
  data: PageComponentsCommunityHeadDeputies;
}) => {
  const { title, deputies: deputies } = data;
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const [isDeputiesOpened, setIsDeputiesOpened] = useState(false);
  const handleDeputiesClick = () => {
    setIsDeputiesOpened((prev) => !prev);
  };
  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };
  useEffect(() => {
    if (window.location.hash === "#deputies") {
      const deputiesElement = document.getElementById("deputies");
      if (deputiesElement) {
        handleDeputiesClick();
        const targetPosition = deputiesElement.offsetTop - 90;

        scrolle.scrollTo(targetPosition, {
          spy: true,
          smooth: true,
          duration: 500,
        });
      }
    }
  }, []);
  return (
    <div>
      {!isTablet ? (
        <main className={styles.deputies}>
          <div className="container">
            <h2
              data-tina-field={tinaField(data, "title")}
              onClick={() => handleDeputiesClick()}
              id="deputies"
            >
              {title}{" "}
              <ArrowDown
                className={`${isDeputiesOpened ? styles.active : ""}`}
              />
            </h2>
            <hr />
            {isDeputiesOpened && (
              <motion.div
                className={styles.deputies__inner}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={transition}
              >
                {deputies &&
                  deputies.map(
                    (d, index) =>
                      d &&
                      !d?.isHidden &&
                      d?.link && (
                        <Link
                          href={d?.link}
                          data-tina-field={tinaField(d, "link")}
                          key={index}
                        >
                          <motion.div
                            className={styles.deputies__inner_deputy}
                            layout
                          >
                            <div
                              className={styles.deputies__inner_deputy_photo}
                            >
                              {d?.image && (
                                <Image
                                  src={d?.image}
                                  width={416}
                                  height={420}
                                  data-tina-field={tinaField(d, "image")}
                                />
                              )}
                            </div>
                            <div className={styles.deputies__inner_deputy_desc}>
                              {d?.position && (
                                <h3 data-tina-field={tinaField(d, "position")}>
                                  {d?.position}
                                </h3>
                              )}
                              {d?.fullname && (
                                <p data-tina-field={tinaField(d, "fullname")}>
                                  {d?.fullname}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      )
                  )}
              </motion.div>
            )}
          </div>
        </main>
      ) : null}
    </div>
  );
};
