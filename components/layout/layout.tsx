import Head from "next/head";
import Header from "./Header/Header";
import layoutData from "./../../content/global/index.json";
import { Global } from "../../tina/__generated__/types";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Header/components/Menu/Menu";
import Footer from "./Footer/Footer";
import { useRouter } from "next/router";
import styles from "./layout.module.scss";

export const Layout = ({
  data = layoutData,
  children,
}: {
  data?: Omit<Global, "id" | "_sys" | "_values">;
  children: React.ReactNode;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    menuOpen && setMenuOpen(false);
  }, [router.asPath]);

  return (
    <div className={styles.layout}>
      <Head>
        <title>Широківська об'єднана територіальна громада</title>
        <meta
          name="description"
          content="Широківська об'єднана територіальна громада"
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </Head>
      <Header
        data={data?.header}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <AnimatePresence mode="wait">
        {menuOpen && <Menu data={data?.header} />}
        {!menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <main>{children}</main>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer data={data?.footer} />
    </div>
  );
};
