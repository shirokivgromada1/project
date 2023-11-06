import styles from "./News.module.scss"
import CustomSwiper from "./../../../util/CustomSwiper/CustomSwiper"
import { FC, useEffect, useState } from "react"
import "swiper/css"
import client from "@/tina/__generated__/client"
import {
	DepartmentPeopleComponentsNews,
	PageComponentsNews,
} from "@/tina/__generated__/types"
import { tinaField } from "tinacms/dist/react"
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery"
import { ParsedUrlQuery } from "querystring"
import { useFilter } from "@/context/FilterContext"

export const News = ({
	data,
}: {
	data: PageComponentsNews | DepartmentPeopleComponentsNews
}) => {
	const [news, setNews] = useState<any[] | null | undefined>(null)
	const [isLoading, setLoading] = useState(false)

	const { headline, positionText, notMain } = data
	const match = useBetterMediaQuery("(max-width: 768px)")
	const isMobile = useBetterMediaQuery("(max-width: 390px)")
	const { onChangeCategory } = useFilter()

	useEffect(() => {
		const fetchContent = async () => {
			setLoading(true)
			const newsResponse = await client.queries.newsConnection({
				filter: {
					hideNews: {
						eq: false,
					},
				},
			})
			setNews(newsResponse.data.newsConnection.edges)
			setLoading(false)
		}
		fetchContent()
	}, [])

	return (
		<div className={styles.news}>
			<div className="container">
				<h1
					style={{
						textAlign:
							(headline?.positionHeadline as "left" | "right" | "center") ||
							"center",
						fontSize: `${notMain ? "28px" : ""}`,
						textTransform: `${notMain ? "initial" : "uppercase"}`,
						lineHeight: `${notMain ? "normal" : "115.023%"}`,
						fontWeight: `${notMain ? "500" : "300"}`,
						...(match
							? {
									fontSize: `${notMain ? "22px" : ""}`,
							  }
							: {}),
					}}
					data-tina-field={tinaField(data, "headline")}>
					{headline?.text}
				</h1>
				<CustomSwiper
					positionText={positionText}
					isLoading={isLoading}
					data={news}
				/>
			</div>
		</div>
	)
}
