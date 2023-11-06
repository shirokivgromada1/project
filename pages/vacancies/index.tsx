import { Layout } from "./../../components/layout/layout";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import { GetServerSidePropsContext } from "next";
import { Components } from "@/components/blocks-renderer";
import { Page } from "@/tina/__generated__/types";

export default function Home(
  props: AsyncReturnType<typeof getServerSideProps>["props"]
) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout data={data.global}>
      <Components {...(data.page as Omit<Page, "id">)} />
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data, query, variables } = await client.queries.vacanciesPageQuery({
    relativePath: "vacancies.md",
  });

  return {
    props: {
      data: data,
      query: query,
      variables: variables,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
