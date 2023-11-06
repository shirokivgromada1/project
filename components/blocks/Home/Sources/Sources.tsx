import Link from "next/link";
import styles from "./Sources.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useMediaQuery } from "usehooks-ts";
import {
  DepartmentPeopleComponentsSources,
  PageComponentsSources,
} from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Sources = ({
  data,
}: {
  data: PageComponentsSources | DepartmentPeopleComponentsSources;
}) => {
  const [isView, setView] = useState(false);
  const { title, source: sources } = data;
  const [viewCount, setCount] = useState(4);

  const defaultScreen = useMediaQuery("(min-width:1330px)");
  const largeScreen = useMediaQuery("(max-width:1330px) and (min-width:759px)");
  const mediumScreen = useMediaQuery(
    "(max-width:759px) and (min-width: 370px)"
  );
  const smallScreen = useMediaQuery("(max-width:370px)");

  useEffect(() => {
    if (sources) {
      defaultScreen && setCount(4);
      largeScreen && setCount(3);
      mediumScreen && setCount(2);
      smallScreen && setCount(1);
    }
  }, [largeScreen, mediumScreen, smallScreen, defaultScreen]);

  return (
    <div className={styles.links}>
      <div className="container">
        {title && <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>}
        <div className={styles.links_wrapper}>
          {sources && (
            <div className={styles.links__inner}>
              {sources.slice(0, viewCount).map(
                (s, index: number) =>
                  s?.sourceLink && (
                    <div key={index}>
                      <Link
                        href={s.sourceLink}
                        data-tina-field={tinaField(s, "sourceLink")}
                      >
                        <a>
                          <img
                            src={`${s?.sourceIcon}`}
                            alt="link"
                            data-tina-field={tinaField(s, "sourceIcon")}
                          />
                          <span data-tina-field={tinaField(s, "sourceTitle")}>
                            {s?.sourceTitle}
                          </span>
                        </a>
                      </Link>
                    </div>
                  )
              )}
            </div>
          )}
          <AnimateHeight
            duration={500}
            height={isView ? "auto" : 0}
            className={styles.links_animateHeight}
          >
            <div
              className={styles.links__inner + " " + styles.links__inner_all}
            >
              {sources &&
                sources.slice(viewCount, undefined).map(
                  (s, index: number) =>
                    s?.sourceLink && (
                      <div key={index}>
                        <Link
                          href={s.sourceLink}
                          data-tina-field={tinaField(s, "sourceLink")}
                        >
                          <a>
                            <img
                              src={`${s?.sourceIcon}`}
                              alt="link"
                              data-tina-field={tinaField(s, "sourceIcon")}
                            />
                            <span data-tina-field={tinaField(s, "sourceTitle")}>
                              {s?.sourceTitle}
                            </span>
                          </a>
                        </Link>
                      </div>
                    )
                )}
            </div>
          </AnimateHeight>
        </div>
        {sources && sources.length > viewCount && (
          <div className={styles.links__seeMore}>
            <button type="button" onClick={() => setView((prev) => !prev)}>
              <span>{isView ? "Менше" : "Більше"}</span>
              <IoIosArrowDown
                style={{
                  transform: isView ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "all 0.3s linear",
                }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
