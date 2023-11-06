import styles from "./CommunityHeadEnterprises.module.scss";
import { PageComponentsCommunityHeadEnterprises } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
import ArrowDown from "../../../assets/arrow-down.svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animateScroll as scrolle } from "react-scroll/modules";
export const CommunityHeadEnterprises = ({
  data,
}: {
  data: PageComponentsCommunityHeadEnterprises;
}) => {
  const { title, enterprises: enterprises } = data;
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const [isEnterpriseOpened, setIsEnterpriseOpened] = useState(false);
  const handleEnterprisesClick = () => {
    setIsEnterpriseOpened((prev) => !prev);
  };
  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };
  useEffect(() => {
    if (window.location.hash === "#enterprises") {
      const enterpisesElement = document.getElementById("enterprises");
      if (enterpisesElement) {
        handleEnterprisesClick();
        const targetPosition = enterpisesElement.offsetTop - 90;

        scrolle.scrollTo(targetPosition, {
          spy: true,
          smooth: true,
          duration: 500,
        });
      }
    }
  }, []);
  return (
    <>
      {!isTablet ? (
        <main className={styles.deputies}>
          <div className="container">
            <h2
              id="enterprises"
              data-tina-field={tinaField(data, "title")}
              onClick={() => handleEnterprisesClick()}
            >
              {title}
              <ArrowDown
                className={`${isEnterpriseOpened ? styles.active : ""}`}
              />
            </h2>
            <hr />
            {isEnterpriseOpened && (
              <motion.div
                className={styles.deputies__inner}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={transition}
              >
                {enterprises &&
                  enterprises.map(
                    (e, index) =>
                      e &&
                      !e?.isHidden &&
                      e?.link && (
                        <Link
                          href={e?.link}
                          data-tina-field={tinaField(e, "link")}
                          key={index}
                        >
                          <motion.div
                            className={styles.deputies__inner_deputy}
                            layout
                          >
                            {e?.name && (
                              <h4 data-tina-field={tinaField(e, "name")}>
                                {e?.name}
                              </h4>
                            )}
                          </motion.div>
                        </Link>
                      )
                  )}
              </motion.div>
            )}
          </div>
        </main>
      ) : null}
    </>
  );
};
