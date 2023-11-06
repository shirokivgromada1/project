import { Dispatch, FC, useEffect, useState } from "react";
import styles from "./SearchModal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "react-modal";
import { GoSearch } from "react-icons/go";
import AnimateHeight from "react-animate-height";
// import { builder } from "@builder.io/react"
import Logo from "./../../../../../../assets/logoSmall.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// Modal.setAppElement("#__next");

type Props = {
  setSearchView: Dispatch<boolean>;
  searchView: boolean;
};

const SearchModal: FC<Props> = ({ searchView, setSearchView }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[] | null>(null);

  const router = useRouter();

  //   useEffect(() => {
  //     setLoading(true);
  //     async function getSearch() {
  //       const links = (await builder.getAll("navigation-links")).filter((link) =>
  //         link?.data?.text.toLowerCase().startsWith(keyword.toLowerCase())
  //       );
  //       setData(links);
  //       setLoading(false);
  //     }
  //     getSearch();
  //   }, [keyword]);

  return (
    <Modal
      isOpen={searchView}
      onRequestClose={() => setSearchView(false)}
      className={styles.modal}
      closeTimeoutMS={200}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.modal__inner}
      >
        <div className={styles.modal__inner_search}>
          <input
            autoFocus
            id="search"
            type="text"
            placeholder="Введіть слово"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <label htmlFor="search">
            <GoSearch />
          </label>
        </div>
        <AnimateHeight height={isLoading ? 40 : 0}>
          <div className={styles.modal__inner_loading}>
            <span>Пошук...</span>
            <div></div>
          </div>
        </AnimateHeight>
        {data && data.length > 0 && (
          <motion.div className={styles.modal__inner_answers}>
            {data.map((d, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"answer" + index}
                onClick={() => router.push(d.data.url)}
              >
                <Image src={Logo} alt="logo" width={25} height={24.35} />
                <Link href={d.data.url}>{d.data.text}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </Modal>
  );
};

export default SearchModal;
