import Link from "next/link";
import styles from "./Info.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import {
  DepartmentPeopleComponentsInfoPages,
  PageComponentsInfoPages,
} from "@/tina/__generated__/types";
import client from "@/tina/__generated__/client";
import { tinaField } from "tinacms/dist/react";

export const Info = ({
  data,
}: {
  data: PageComponentsInfoPages | DepartmentPeopleComponentsInfoPages;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [viewData, setViewData] = useState<any[]>([]);

  const { listInfoPages } = data;

  useEffect(() => {
    const getContent = async (title: string | undefined) => {
      if (title) {
        setLoading(true);

        const connectionString = `${title}Connection`;

        try {
          //@ts-ignore
          const response = await client.queries[connectionString]();
          const items = response.data[connectionString].edges;
          setLoading(false);
          return items[items.length - 1];
        } catch (err) {
          return null;
        }
      }
    };

    const fetchData = async () => {
      const result: any[] = [];

      for (const page of listInfoPages || []) {
        const response = await getContent(page?.page?.title);
        result.push(response);
      }

      setViewData(result);
    };

    fetchData();
  }, [listInfoPages]);

  return (
    <div className={styles.info}>
      <div className="container">
        <Swiper
          navigation={{
            nextEl: `.info-swiper-button-next`,
            prevEl: `.info-swiper-button-prev`,
            // disabledClass: `info-swiper-button-disabled`,
          }}
          modules={[Navigation]}
          slidesPerView={"auto"}
          className={styles.info__swiper}
        >
          {listInfoPages &&
            listInfoPages.map((page, index: number) => {
              return (
                <SwiperSlide key={index}>
                  {page && (
                    <Link href={`/${page?.page?.title || page.pageLink}`}>
                      <a>
                        <div className={styles.info__page}>
                          <div>
                            <h5 data-tina-field={tinaField(page, "pageTitle")}>
                              {page.pageTitle}
                            </h5>
                            <div data-tina-field={tinaField(page, "page")}>
                              {(viewData[index]?.node?.image ||
                                page?.pageImage) && (
                                <Image
                                  src={
                                    viewData[index]?.node?.image ||
                                    page?.pageImage
                                  }
                                  alt="picture1"
                                  width={385}
                                  height={242}
                                  blurDataURL={
                                    viewData[index]?.node?.image ||
                                    page.pageImage
                                  }
                                  placeholder="blur"
                                  className={loaded ? "unblur" : ""}
                                  onLoadingComplete={() => setLoaded(true)}
                                />
                              )}
                              <p>
                                {(viewData[index] &&
                                  viewData[index].node.title.slice(0, 100)) ||
                                  page.pageText?.slice(0, 100)}
                                {((viewData[index] &&
                                  viewData[index].node.title.length > 100) ||
                                  (page.pageText &&
                                    page.pageText?.length > 100)) &&
                                  "..."}
                              </p>
                            </div>
                          </div>
                          <button type="button">Детальніше</button>
                        </div>
                      </a>
                    </Link>
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className={styles.swiperButton + " " + "info-swiper-button-next"}>
          <button type="button" className={styles.leftArrow__button}>
            <HiArrowRight />
          </button>
        </div>
        <div className={styles.swiperButton + " " + "info-swiper-button-prev"}>
          <button type="button" className={styles.rightArrow__button}>
            <HiArrowLeft />
          </button>
        </div>
      </div>
    </div>
  );
};
