import styles from "./AnnouncementCard.module.scss"
import { FC, useEffect, useState } from "react"
import Card from "../../util/Card/Card"
import { Announcements } from "@/tina/__generated__/types"
import client from "@/tina/__generated__/client"
import { AsyncReturnType } from "@/pages/[filename]"
import ScrollToTop from "react-scroll-to-top"
import { HiArrowNarrowUp } from "react-icons/hi"

export const getMoreContent = async () => {
	const moreAnnResponse = await client.queries.announcementsConnection({
		last: 5,
		sort: "pubDate",
	})
	return moreAnnResponse.data.announcementsConnection.edges
}

export interface AnnouncementsCardProps
	extends Omit<Announcements, "id" | "_sys" | "__typename" | "_values"> {
	url: string
}

export const AnnouncementCard: FC<AnnouncementsCardProps> = props => {
	const [isLoading, setLoading] = useState(false)
	const [seeMore, setSeeMore] = useState<null | AsyncReturnType<
		typeof getMoreContent
	>>(null)

	console.log("Ann props", props)

	useEffect(() => {
		const getContent = async () => {
			setLoading(true)
			const moreAnn = await getMoreContent()
			setSeeMore(moreAnn)
			setLoading(false)
		}
		getContent()
	}, [])

	if (!props) return <>Fetching</>

	return (
		<>
			<Card
				data={props}
				dataMore={seeMore}
				backHref={"/announcements"}
				className={styles.newsCard}
				isAnnouncement={true}
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
