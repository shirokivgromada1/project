import styles from "./AboutDesc.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsAboutDesc } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Image from "next/image";
import AboutPlace from "../../../assets/aboutIcons.png";
import Background from "../../../assets/svg-backgr.svg";
export const AboutDesc = ({ data }: { data: PageComponentsAboutDesc }) => {
  const { title, year, image, people, towns, townsTitle, square, squareTitle } =
    data;
  const isMobile = useBetterMediaQuery("(max-width: 450px)");
  return (
    <main className={styles.about}>
      <div className="container">
        <div className={styles.about__inner}>
          <div className={styles.about__inner_banner1}>
            {image && (
              <Image
                src={image}
                width={1300}
                height={400}
                data-tina-field={tinaField(data, "image")}
              />
            )}
          </div>
          <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
          <div>
            <div>
              <div>
                {people && (
                  <h4 data-tina-field={tinaField(data, "people")}>
                    {people} <span>тис. осіб</span>
                  </h4>
                )}
                <p data-tina-field={tinaField(data, "year")}>{year}</p>
              </div>
              <div>
                <h4 data-tina-field={tinaField(data, "towns")}>{towns}</h4>
                <p data-tina-field={tinaField(data, "townsTitle")}>
                  {townsTitle}
                </p>
              </div>
              <div>
                {square && (
                  <h4 data-tina-field={tinaField(data, "square")}>
                    {square}{" "}
                    <span>
                      км<sup>2</sup>
                    </span>
                  </h4>
                )}
                <p data-tina-field={tinaField(data, "squareTitle")}>
                  {squareTitle}
                </p>
              </div>
            </div>
            <div className={styles.about__inner_ground}>
              <Image src={AboutPlace} width={1300} height={96} />
            </div>
            {isMobile ? (
              <div className={styles.about__inner_background}>
                <Background data-tina-field={tinaField(data, "image")} />
                <div>
                  <div>
                    {people && (
                      <h4 data-tina-field={tinaField(data, "people")}>
                        {people} <span>тис. осіб</span>
                      </h4>
                    )}
                    <p data-tina-field={tinaField(data, "year")}>{year}</p>
                  </div>
                  <div>
                    <h4 data-tina-field={tinaField(data, "towns")}>{towns}</h4>
                    <p data-tina-field={tinaField(data, "townsTitle")}>
                      {townsTitle}
                    </p>
                  </div>
                  <div>
                    {square && (
                      <h4 data-tina-field={tinaField(data, "square")}>
                        {square}{" "}
                        <span>
                          км<sup>2</sup>
                        </span>
                      </h4>
                    )}
                    <p data-tina-field={tinaField(data, "squareTitle")}>
                      {squareTitle}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};
