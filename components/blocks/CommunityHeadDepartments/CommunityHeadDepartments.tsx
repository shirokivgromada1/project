import styles from "./CommunityHeadDepartments.module.scss";
import { PageComponentsCommunityHeadDepartments } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
import ArrowDown from "../../../assets/arrow-down.svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animateScroll as scrolle } from "react-scroll/modules";
export const CommunityHeadDepartments = ({
  data,
}: {
  data: PageComponentsCommunityHeadDepartments;
}) => {
  const { title, departments: departments } = data;
  const isTablet = useBetterMediaQuery("(max-width: 768px)");
  const [isDepartmentsOpened, setIsDepartmentsOpened] = useState(false);
  const handleDepartmentsClick = () => {
    setIsDepartmentsOpened((prev) => !prev);
  };
  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };
  useEffect(() => {
    if (window.location.hash === "#departments") {
      const departmentsElement = document.getElementById("departments");
      if (departmentsElement) {
        handleDepartmentsClick();
        const targetPosition = departmentsElement.offsetTop - 90;

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
        <main className={styles.departments}>
          <div className="container">
            <h2
              data-tina-field={tinaField(data, "title")}
              onClick={() => handleDepartmentsClick()}
              id="departments"
            >
              {title}
              <ArrowDown
                className={`${isDepartmentsOpened ? styles.active : ""}`}
              />
            </h2>
            <hr />
            {isDepartmentsOpened && (
              <motion.div
                className={styles.departments__inner}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={transition}
              >
                {departments &&
                  departments.map(
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
                            className={styles.departments__inner_department}
                            layout
                          >
                            <div
                              className={
                                styles.departments__inner_department_icon
                              }
                            >
                              {d?.image && (
                                <Image
                                  src={d?.image}
                                  width={37}
                                  height={37}
                                  data-tina-field={tinaField(d, "image")}
                                />
                              )}
                            </div>
                            <h4 data-tina-field={tinaField(d, "name")}>
                              {d?.name}
                            </h4>
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
