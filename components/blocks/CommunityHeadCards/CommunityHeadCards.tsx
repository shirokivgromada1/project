import styles from "./CommunityHeadCards.module.scss";
import { PageComponentsCommunityHeadCards } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import Link from "next/link";
export const CommunityHeadCards = ({
  data,
}: {
  data: PageComponentsCommunityHeadCards;
}) => {
  const { cards: cards } = data;
  const isMobile = useBetterMediaQuery("(max-width: 768px)");
  const isTinyMobile = useBetterMediaQuery("(max-width: 430px)");
  return (
    <>
      {!isMobile ? (
        <main className={styles.cards}>
          <div className="container">
            <ul className={styles.cards__list}>
              {cards &&
                cards.map(
                  (c, index) =>
                    c &&
                    !c.isHidden &&
                    c?.link && (
                      <Link href={c.link}>
                        <li
                          key={index}
                          className={styles.cards__list_item}
                          data-tina-field={tinaField(c)}
                        >
                          <p className={styles.cards__list_item_paragraph}>
                            {c?.name}
                          </p>
                        </li>
                      </Link>
                    )
                )}
            </ul>
          </div>
        </main>
      ) : null}
    </>
  );
};
