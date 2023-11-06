import React from "react"
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next"
import { Components } from "../components/blocks-renderer"
import { useTina } from "tinacms/dist/react"
import { Layout } from "../components/layout/layout"
import { client } from "../tina/__generated__/client"
import { Page } from "@/tina/__generated__/types"

export default function HomePage(
	props: AsyncReturnType<typeof getServerSideProps>["props"]
) {
	const { data } = useTina(props)

	return (
		<Layout data={data.global as any}>
			<Components {...(data.page as Omit<Page, "id">)} />
		</Layout>
	)
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const tinaProps = await client.queries.contentQuery({
		relativePath: `${ctx?.params?.filename}.md`,
	})
	const props = {
		...tinaProps,
		enableVisualEditing: process.env.VERCEL_ENV === "preview",
	}
	return {
		props: JSON.parse(JSON.stringify(props)) as typeof props,
	}
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
	T extends (...args: any) => Promise<infer R> ? R : any
