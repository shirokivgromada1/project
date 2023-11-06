import styles from "./NewsCard.module.scss"
import { FC, useEffect, useState } from "react"
import Card from "./../../util/Card/Card"
import { News, NewsConnectionEdges } from "@/tina/__generated__/types"
import client from "@/tina/__generated__/client"
import { AsyncReturnType } from "@/pages/[filename]"
import ScrollToTop from "react-scroll-to-top"
import { HiArrowNarrowUp } from "react-icons/hi"
import { resolve } from "dns/promises"
import { useRouter } from "next/router"

export interface NewsCardProps extends Omit<News, "__typename" | "_values"> {
	url: string
	filename: string | string[] | undefined
}

export const getContentByCategory = async (category: string | undefined) => {
	const newsResponse = await client.queries.newsConnection({
		first: 5,
		filter: {
			templates: {
				category: {
					category: {
						newsCategories: {
							category: {
								in: [category || ""],
							},
						},
					},
				},
			},
		},
		sort: "pubDate",
	})
	return newsResponse.data.newsConnection.edges
}

const NewsCard: FC<NewsCardProps> = data => {
	const [isLoading, setLoading] = useState(false)
	const [seeMore, setSeeMore] = useState<null | NewsConnectionEdges[]>(null)

	const { templates } = data

	const { query } = useRouter()

	useEffect(() => {
		const getContent = async () => {
			if (templates) {
				const newsByCategories: NewsConnectionEdges[] = []
				setLoading(true)
				const newsByCategory = await getContentByCategory(
					(query.category as string) || templates[0]?.category?.category
				)
				const filteredNews: NewsConnectionEdges[] = newsByCategory?.filter(
					news => news?.node?._sys.filename !== query.filename
				) as NewsConnectionEdges[]
				newsByCategories.push(...filteredNews)

				setSeeMore(newsByCategories)
			}
			setLoading(false)
		}
		getContent()
	}, [data])

	if (!data) return <>Fetching</>

	return (
		<>
			<Card
				data={data}
				dataMore={seeMore}
				backHref={"/news"}
				className={styles.newsCard}
				isNews={true}
				category={query.category as string}
				isLoading={isLoading}
			/>
			<ScrollToTop
				smooth
				component={<HiArrowNarrowUp />}
				color="#309C54"
				className={styles.buttonTop}
			/>
		</>
	)
}

export default NewsCard
