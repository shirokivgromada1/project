import { Layout } from "./../../components/layout/layout"
import { useTina } from "tinacms/dist/react"
import { client } from "../../tina/__generated__/client"
import NewsCard from "../../components/news/NewsID/NewsCard"
import { GetServerSidePropsContext } from "next"
import { Components } from "@/components/blocks-renderer"
import { Page } from "@/tina/__generated__/types"
import { useEffect } from "react"
import { useFilter } from "@/context/FilterContext"

export default function Home(
	props: AsyncReturnType<typeof getServerSideProps>["props"]
) {
	// data passes though in production mode and data is updated to the sidebar data in edit-mode
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const { filterQuery } = props
	const { onChangeCategory } = useFilter()

	return (
		<Layout data={data.global}>
			<Components {...(data.page as Omit<Page, "id">)} />
		</Layout>
	)
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { data, query, variables } = await client.queries.newsPageQuery({
		relativePath: "news.md",
	})

	return {
		props: {
			data: data,
			query: query,
			variables: variables,
			filterQuery: ctx.query,
		},
	}
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
	T extends (...args: any) => Promise<infer R> ? R : any
