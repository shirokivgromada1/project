import styles from "./SocialProtection.module.scss";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { PageComponentsSocialProtection } from "@/tina/__generated__/types";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
export const SocialProtection = ({
  data,
}: {
  data: PageComponentsSocialProtection;
}) => {
  const { title, image, desc, links: links } = data;
  const isMobile = useBetterMediaQuery("(max-width: 391px)");
  return (
    <main className={styles.protection}>
      <div className="container">
        <div className={styles.protection__inner}>
          {image && (
            <Image
              src={image}
              width={1100}
              height={400}
              alt="social protection image"
              data-tina-field={tinaField(data, "image")}
            />
          )}

          <div className={styles.protection__inner_desc}>
            {title && (
              <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
            )}
            {desc?.children.map((annItem: any, annIndex: number) => {
              if (annItem.type.startsWith("h"))
                return annItem.children.map((text: any) => (
                  <annItem.type
                    key={"announceHeadline" + annIndex}
                    style={{
                      fontWeight: text.bold && "bold",
                      fontStyle: text.italic && "italic",
                    }}
                    data-tina-field={tinaField(data, "desc")}
                  >
                    {text.text}
                  </annItem.type>
                ));
              if (annItem.type.startsWith("p"))
                return annItem.children.map((text: any) => (
                  <p
                    key={"announceParagraph" + annIndex}
                    style={{
                      fontWeight: text.bold && "bold",
                      fontStyle: text.italic && "italic",
                    }}
                    data-tina-field={tinaField(data, "desc")}
                  >
                    {text.text}
                  </p>
                ));
              return null;
            })}
          </div>
          <div className={styles.protection__inner_links}>
            {links &&
              links.map((l, index) =>
                l && !l.hidden && l.url ? (
                  <a
                    href={l.url}
                    key={index}
                    data-tina-field={tinaField(l, "url")}
                  >
                    <div className={styles.linkIcon} />
                    <h5 data-tina-field={tinaField(l, "title")}>{l?.title}</h5>
                  </a>
                ) : null
              )}
          </div>
        </div>
      </div>
    </main>
  );
};
