import styles from "./Sections.module.scss"
import ClockIcon from "./../../../../assets/clock.svg"
import CalendarIcon from "./../../../../assets/calendar.svg"
import ArrowRightIcon from "./../../../../assets/arrow-right.svg"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import {
	AnnouncementsConnectionEdges,
	AnnouncementsFilter,
	DepartmentPeopleComponentsAnnouncementsSections,
	InputMaybe,
	PageComponentsAnnouncementsSections,
} from "@/tina/__generated__/types"
import client from "@/tina/__generated__/client"
import { AsyncReturnType } from "@/pages/[filename]"
import { useFilter } from "@/context/FilterContext"
import { format } from "date-fns"
import { NominativeNamesMonths } from "../../News/Sections/Sections"
import Link from "next/link"
import { motion, useScroll } from "framer-motion"
import { Skeleton, Typography } from "@mui/material"
import Image from "next/image"
import { PuffLoader } from "react-spinners"

const PAGINATION_COUNT = 5

type TGetAnnouncementsByFilter = {
	setLoading: (loading: boolean) => void
	startDate?: Date | null
	endDate?: Date | null
	search?: string | null
	cursor: string | null
	setCursor: (value: string | null) => void
	setNextPage: Dispatch<SetStateAction<boolean>>
	showSkeleton?: boolean
	setPaginationLoading?: (value: boolean) => void
}

export function addOneDay(date = new Date(), count = 1) {
	date.setDate(date.getDate() + count)
	return date
}

export function minusOneDay(date = new Date(), count = 1) {
	date.setDate(date.getDate() - count)
	return date
}

export const getAnnouncementsByFilter = async ({
	setLoading,
	startDate,
	endDate,
	search,
	cursor = "",
	setCursor,
	setNextPage,
	showSkeleton = true,
	setPaginationLoading,
}: TGetAnnouncementsByFilter) => {
	showSkeleton
		? setLoading(true)
		: setPaginationLoading && setPaginationLoading(true)

	const filter: { pubDate?: any } = {}

	if (startDate) {
		if (endDate && startDate.getTime() !== endDate.getTime()) {
			const copyStart = new Date(startDate)
			const copyEnd = new Date(endDate)
			const formatStartDate = minusOneDay(copyStart)
			const formatEndDate = addOneDay(copyEnd)

			filter.pubDate = {
				after: new Date(formatStartDate).toDateString(),
				before: new Date(formatEndDate).toDateString(),
			}
		} else {
			filter.pubDate = {
				after: new Date(startDate).toDateString(),
				before: new Date(
					new Date(startDate).setDate(startDate.getDate() + 1)
				).toDateString(),
			}
		}
	} else {
		filter.pubDate = {
			before: new Date().toDateString(),
		}
	}

	if (cursor === "") {
		showSkeleton
			? setLoading(false)
			: setPaginationLoading && setPaginationLoading(false)
		return
	}

	if (!search && !startDate && !endDate) {
		const announcementResponse = await client.queries.announcementsConnection({
			first: PAGINATION_COUNT,
			sort: "pubDate",
			last: 1,
			before: cursor,
			filter: {
				pubDate: {
					before: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
				},
				hideAnn: {
					eq: false,
				},
			},
		})
		setCursor(
			announcementResponse.data.announcementsConnection.pageInfo.endCursor
		)
		setNextPage(
			announcementResponse.data.announcementsConnection.pageInfo.hasPreviousPage
		)
		showSkeleton
			? setLoading(false)
			: setPaginationLoading && setPaginationLoading(false)
		return announcementResponse.data.announcementsConnection.edges || null
	}

	let announcements: AnnouncementsConnectionEdges[] = []
	let totalCount = 0
	let announcementsConnection
	let _cursor = cursor
	do {
		const announcementResponse = await client.queries.announcementsConnection({
			first: PAGINATION_COUNT,
			filter: {
				hideAnn: {
					eq: false,
				},
				...(filter as InputMaybe<AnnouncementsFilter>),
			},
			last: 1,
			sort: "pubDate",
			before: _cursor || "",
		})

		announcementsConnection = announcementResponse.data.announcementsConnection

		_cursor = announcementsConnection.pageInfo.endCursor
		if (search) {
			announcementsConnection.edges?.forEach(n => {
				const titleMatch = n?.node?.title
					.toLowerCase()
					.includes(search.toLowerCase())
				const descriptionMatch = n?.node?.description.children.some(
					(child: any) =>
						child.children.some((c: any) =>
							c?.text?.toLowerCase().includes(search.toLowerCase())
						)
				)
				if (titleMatch || descriptionMatch) {
					announcements.push(n as AnnouncementsConnectionEdges)
					totalCount++
				}
			})
		}
	} while (
		announcementsConnection.edges?.length &&
		totalCount <
			Math.min(PAGINATION_COUNT, announcementsConnection.edges?.length) &&
		announcementsConnection.pageInfo.hasPreviousPage
	)

	setCursor(announcementsConnection.pageInfo.endCursor)
	setNextPage(announcementsConnection.pageInfo.hasPreviousPage)

	showSkeleton
		? setLoading(false)
		: setPaginationLoading && setPaginationLoading(false)

	if (search) {
		return announcements || null
	} else {
		return announcementsConnection?.edges || null
	}
}

export const Sections = ({
	data,
}: {
	data:
		| PageComponentsAnnouncementsSections
		| DepartmentPeopleComponentsAnnouncementsSections
}) => {
	const containerRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		layoutEffect: false,
	})

	const [announcements, setAnnouncements] = useState<null | AsyncReturnType<
		typeof getAnnouncementsByFilter
	>>(null)

	const [isLoading, setLoading] = useState(false)
	const [cursor, setCursor] = useState<string | null>(null)
	const [hasNextPage, setNextPage] = useState(true)
	const [isPaginationLoading, setPaginationLoading] = useState(false)
	const [y, setY] = useState(0)

	const { date, search, onChangeDate, onChangeSearch } = useFilter()

	useEffect(() => {
		scrollYProgress.onChange(v => setY(v))
	}, [scrollYProgress])

	useEffect(() => {
		const getContent = async () => {
			const ann = await getAnnouncementsByFilter({
				setLoading,
				startDate: date.startDate,
				endDate: date.endDate,
				search,
				cursor,
				setCursor,
				setNextPage,
				showSkeleton: false,
				setPaginationLoading,
			})
			if (ann)
				if (announcements) {
					setAnnouncements([...announcements, ...ann])
				} else {
					setAnnouncements(ann)
				}
		}

		if (y >= 0.9 && hasNextPage) getContent()
	}, [y])

	useEffect(() => {
		onChangeDate({ startDate: null, endDate: null })
		onChangeSearch(null)
		const getContent = async () => {
			const ann = await getAnnouncementsByFilter({
				setLoading,
				startDate: null,
				endDate: null,
				search: null,
				cursor,
				setCursor,
				setNextPage,
				showSkeleton: true,
				setPaginationLoading,
			})
			if (ann) setAnnouncements(ann)
		}
		getContent()
	}, [])

	useEffect(() => {
		const getContent = async () => {
			const ann = await getAnnouncementsByFilter({
				setLoading,
				startDate: date.startDate,
				endDate: date.endDate,
				search,
				cursor: null,
				setCursor,
				setNextPage,
				showSkeleton: true,
				setPaginationLoading,
			})
			if (ann) setAnnouncements(ann)
		}
		getContent()
	}, [search, date])

	useEffect(() => {
		console.log("isLoading", isLoading)
	}, [isLoading])

	if (announcements && announcements.length === 0)
		return (
			<div className={styles.noAnnouncements}>
				<div className="container">
					<p>
						Анонсів{" "}
						{date.startDate
							? !date.endDate ||
							  date.startDate.getTime() === date.endDate.getTime()
								? `на ${date?.startDate?.getDate()} ${
										NominativeNamesMonths[date.startDate.getMonth()]
								  }`
								: `з ${date.startDate.getDate()} ${
										NominativeNamesMonths[date.startDate.getMonth()]
								  } по ${date.endDate.getDate()} ${
										NominativeNamesMonths[date.endDate.getMonth()]
								  }`
							: null}{" "}
						немає
						{search && ` по запиту "${search}"`}
					</p>
				</div>
			</div>
		)

	return (
		<motion.main className={styles.announcements}>
			<motion.div className="container">
				<motion.div className={styles.announcements__inner}>
					{isLoading &&
						Array.from(new Array(3)).map((number, idx) => (
							<motion.div
								key={"filterAnnouncementsSkeleton" + idx}
								className={styles.announcements__skeletonContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}>
								<div className={styles.announcements__inner_time}>
									<CalendarIcon
										className={styles.announcements__inner_time_calendar}
									/>
									<div className={styles.announcements__inner_time_clock}>
										<ClockIcon />
										<Typography variant="caption">
											<Skeleton width={35} />
										</Typography>
									</div>
								</div>
								<div className={styles.announcements__inner_info}>
									<Typography variant="h1">
										<Skeleton width={174} />
									</Typography>
									<div className={styles.announcements__inner_info_wrapper}>
										<div
											className={
												styles.announcements__inner_info_wrapper__inner
											}>
											<Skeleton variant="rounded" width={254} height={112} />
											<div>
												<Typography variant="h5">
													<Skeleton />
												</Typography>
												<Typography variant="h5">
													<Skeleton />
												</Typography>
												<Typography variant="h5">
													<Skeleton />
												</Typography>
											</div>
										</div>
										<ArrowRightIcon />
									</div>
								</div>
							</motion.div>
						))}
					{announcements &&
						announcements.map((a, index) => (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								key={"announcement" + index}
								ref={containerRef}>
								<Link href={`/announcements/${a?.node?._sys.filename}`}>
									<a>
										<div className={styles.announcements__inner_time}>
											<CalendarIcon
												className={styles.announcements__inner_time_calendar}
											/>
											{a?.node?.pubDate && (
												<div
													className={
														styles.announcements__inner_time_clock +
														" " +
														(!a?.node?.image
															? styles.announcements__inner_time_clock_noImg
															: "")
													}>
													<ClockIcon />
													<span>
														{format(new Date(a?.node?.pubDate), "HH:mm")}
													</span>
												</div>
											)}
										</div>
										<div className={styles.announcements__inner_info}>
											{a?.node?.pubDate && (
												<h1>
													{format(
														new Date(a?.node?.pubDate),
														`d ${
															NominativeNamesMonths[
																new Date(a?.node?.pubDate).getMonth()
															]
														} yyyy`
													)}
												</h1>
											)}
											<div className={styles.announcements__inner_info_wrapper}>
												<div
													className={
														a?.node?.image
															? styles.announcements__inner_info_wrapper__inner
															: styles.announcements__inner_info_wrapper__inner_onlyTitle
													}>
													{a?.node?.image && (
														<Image
															src={a?.node?.image}
															alt={"aImg" + index}
															height={112}
															width={254}
															objectFit="cover"
														/>
													)}
													<h5>{a?.node?.title}</h5>
												</div>
												<ArrowRightIcon />
											</div>
										</div>
									</a>
								</Link>
							</motion.div>
						))}
					{isPaginationLoading &&
						announcements?.length &&
						announcements.length % PAGINATION_COUNT == 0 && (
							<div className={styles.announcements__loader}>
								<PuffLoader color="#309C54" />
							</div>
						)}
				</motion.div>
			</motion.div>
		</motion.main>
	)
}
