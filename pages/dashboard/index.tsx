import { useAuth } from "@/context/AuthContext";
import styles from "./Dashboard.module.scss";
import client from "@/tina/__generated__/client";
import { GetServerSidePropsContext } from "next";
import { AsyncReturnType } from "../[filename]";
import { useTina } from "tinacms/dist/react";
import DashboardLayout from "@/components/dashboard/layout/layout";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { BounceLoader } from "react-spinners";

type Props = {};

export default function Dashboard(
  props: AsyncReturnType<typeof getServerSideProps>["props"]
) {
  const { data } = useTina(props);

  return (
    <DashboardLayout data={data}>
      <div>TEST</div>
    </DashboardLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `home.md`,
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
  };
  return {
    props: JSON.parse(JSON.stringify(props)) as typeof props,
  };
};
