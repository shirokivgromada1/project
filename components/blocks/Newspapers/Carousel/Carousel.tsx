import styles from "./Carousel.module.scss"
import ClockIcon from "./../../../../assets/clock.svg"
import CalendarIcon from "./../../../../assets/calendar.svg"
import ArrowRightIcon from "./../../../../assets/arrow-right.svg"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
	DepartmentPeopleComponentsNewspapersCarousel,
	DepartmentPeopleComponentsVacanciesSections,
	InputMaybe,
	NewspapersConnectionEdges,
	PageComponentsNewspapersCarousel,
	PageComponentsVacanciesSections,
	VacanciesConnectionEdges,
	VacanciesFilter,
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
import { addOneDay, minusOneDay } from "../../Announcements/Sections/Sections"
import ArrowRight from "./../../../../assets/arrow-right.svg"
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery"
import { Swiper, SwiperSlide } from "swiper/react"
import classNames from "classnames"
import NoImageNewspaper from "./../../../../assets/no-image-newspaper.png"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const PAGINATION_COUNT = 8

type TGetNewspapersByFilter = {
	setLoading: (loading: boolean) => void
	startDate?: Date | null
	endDate?: Date | null
	search?: string | null
	cursor: string | null
	setCursor: (value: string | null) => void
	showSkeleton?: boolean
	setPaginationLoading?: (value: boolean) => void
}

export const getNewspapersByFilter = async ({
	setLoading,
	startDate,
	endDate,
	search,
	cursor = null,
	setCursor,
	showSkeleton = true,
	setPaginationLoading,
}: TGetNewspapersByFilter) => {
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
				eq: new Date(startDate).toDateString(),
			}
		}
	} else {
		filter.pubDate = {
			before: new Date().toDateString(),
		}
	}

	if (cursor === "") return
	if (!search && !startDate && !endDate) {
		const newspapersResponse = await client.queries.newspapersConnection({
			first: PAGINATION_COUNT,
			sort: "pubDate",
			last: 1,
			before: cursor,
			filter: {
				pubDate: {
					before: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
				},
				hidePaper: {
					eq: false,
				},
			},
		})
		setCursor(newspapersResponse.data.newspapersConnection.pageInfo.endCursor)
		showSkeleton
			? setLoading(false)
			: setPaginationLoading && setPaginationLoading(false)
		return newspapersResponse.data.newspapersConnection.edges || null
	}
	let newspapers: NewspapersConnectionEdges[] = []
	let totalCount = 0
	let newspapersConnection
	do {
		const newspapersResponse = await client.queries.newspapersConnection({
			first: PAGINATION_COUNT,
			filter: {
				hidePaper: {
					eq: false,
				},
				...(filter as InputMaybe<VacanciesFilter>),
			},
			after: cursor || "",
		})
		newspapersConnection = newspapersResponse.data.newspapersConnection
		if (
			newspapersConnection.edges &&
			newspapersConnection.edges?.length > PAGINATION_COUNT
		) {
			setCursor(newspapersConnection.pageInfo.endCursor)
		} else {
			setCursor("")
		}

		if (search) {
			newspapersConnection.edges?.forEach(n => {
				const titleMatch = n?.node?.title
					.toLowerCase()
					.includes(search.toLowerCase())
				if (titleMatch) {
					newspapers.push(n as NewspapersConnectionEdges)
					totalCount++
				}
			})
		}
	} while (
		newspapersConnection.edges?.length &&
		totalCount <
			Math.min(PAGINATION_COUNT, newspapersConnection.edges?.length) &&
		cursor &&
		newspapersConnection.pageInfo.endCursor
	)

	showSkeleton
		? setLoading(false)
		: setPaginationLoading && setPaginationLoading(false)

	if (search) {
		return newspapers || []
	} else {
		return newspapersConnection?.edges || []
	}
}

export const NewspapersCarousel = ({
	data,
}: {
	data:
		| PageComponentsNewspapersCarousel
		| DepartmentPeopleComponentsNewspapersCarousel
}) => {
	const containerRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		layoutEffect: false,
	})

	const [newspapers, setNewspapers] = useState<null | AsyncReturnType<
		typeof getNewspapersByFilter
	>>(null)

	const [isLoading, setLoading] = useState(false)
	const [cursor, setCursor] = useState<string | null>(null)
	const [isPaginationLoading, setPaginationLoading] = useState(false)
	const [y, setY] = useState(0)
	const [isAllView, setAllView] = useState(false)

	const { date, search, onChangeDate, onChangeSearch } = useFilter()

	const tabletMatch = useBetterMediaQuery("(max-width: 1000px)") as boolean

	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		ref?.current && setHeight(ref.current.clientHeight)
		ref?.current && setWidth(ref.current.clientWidth)
	})

	useEffect(() => {
		scrollYProgress.onChange(v => setY(v))
	}, [scrollYProgress])

	useEffect(() => {
		const getContent = async () => {
			const papers = await getNewspapersByFilter({
				setLoading,
				startDate: date.startDate,
				endDate: date.endDate,
				search,
				cursor,
				setCursor,
				showSkeleton: false,
				setPaginationLoading,
			})
			if (papers)
				if (newspapers) {
					setNewspapers([...newspapers, ...papers])
				} else {
					setNewspapers(papers)
				}
		}

		if (y >= 0.6 && containerRef.current && cursor) getContent()
	}, [y])

	useEffect(() => {
		onChangeDate({ startDate: null, endDate: null })
		onChangeSearch(null)
		const getContent = async () => {
			const papers = await getNewspapersByFilter({
				setLoading,
				startDate: null,
				endDate: null,
				search: null,
				cursor,
				setCursor,
				showSkeleton: true,
				setPaginationLoading,
			})
			if (papers) setNewspapers(papers)
		}
		getContent()
	}, [])

	useEffect(() => {
		const getContent = async () => {
			const papers = await getNewspapersByFilter({
				setLoading,
				startDate: date.startDate,
				endDate: date.endDate,
				search,
				cursor: null,
				setCursor,
				showSkeleton: true,
				setPaginationLoading,
			})
			if (papers) setNewspapers(papers)
		}
		getContent()
	}, [search, date])

	if (newspapers && newspapers.length === 0)
		return (
			<div className={styles.noNewspapers}>
				<div className="container">
					<p>
						Газет{" "}
						{date.startDate &&
							`з ${date.startDate.getDate()} ${
								NominativeNamesMonths[date.startDate.getMonth()]
							} по ${
								date.endDate &&
								date.startDate.getTime() !== date.endDate.getTime()
									? date.endDate.getDate()
									: "1"
							} ${
								NominativeNamesMonths[
									date.endDate &&
									date.startDate.getTime() !== date.endDate.getTime()
										? date.endDate.getMonth()
										: new Date(
												date.startDate.getFullYear(),
												date.startDate.getMonth() + 1,
												1
										  ).getMonth()
								]
							}`}{" "}
						немає
						{search && ` по запиту "${search}"`}
					</p>
				</div>
			</div>
		)

	return (
		<motion.main className={classNames("container", styles.relative)}>
			<div className={styles.title}>{data.title}</div>
			{!isAllView && (
				<>
					<Swiper
						navigation={{
							nextEl: `.carousel-swiper-button-next`,
							prevEl: `.carousel-swiper-button-prev`,
							// disabledClass: `info-swiper-button-disabled`,
						}}
						modules={[Navigation]}
						slidesPerView={"auto"}
						className={styles.carousel_swiper}>
						{isLoading &&
							Array.from(new Array(4)).map((number, idx) => (
								<SwiperSlide>
									<motion.div
										key={"newspapersSkeleton" + idx}
										className={styles.carousel__slide_skeleton}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}>
										<div className={styles.carousel__slide_skeleton_image}>
											<Skeleton
												variant="rounded"
												width={tabletMatch ? 260 : 318}
												height={tabletMatch ? 400 : 487}
											/>
										</div>
										<div className={styles.carousel__slide_skeleton_details}>
											<Skeleton variant="text" sx={{ fontSize: "18px" }} />
										</div>
									</motion.div>
								</SwiperSlide>
							))}
						{!isLoading &&
							newspapers &&
							newspapers.map((papers, index) => (
								<SwiperSlide>
									{papers?.node?.pdf && (
										<motion.a
											key={"newspapers" + index}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											href={papers?.node?.pdf}
											download>
											<div className={styles.carousel__slide}>
												{papers?.node?.image ? (
													<div className={styles.carousel__slide_image}>
														<Image
															src={papers.node.image}
															alt="Newspaper Preview Image"
															width={318}
															height={487}
														/>
													</div>
												) : (
													<div className={styles.carousel__slide_noImg}>
														<Image
															src={NoImageNewspaper}
															alt="Newspaper Preview Image"
															width={318}
															height={487}
														/>
													</div>
												)}
												<div className={styles.carousel__slide_details}>
													<span>
														{papers.node.title}
														{","}
													</span>
													&nbsp;
													{papers.node.pubDate && (
														<span>
															{new Intl.DateTimeFormat("uk-UA", {
																month: "long",
															}).format(new Date(papers.node.pubDate))}{" "}
															{new Date(papers.node.pubDate).getFullYear()}
														</span>
													)}
												</div>
											</div>
										</motion.a>
									)}
								</SwiperSlide>
							))}
					</Swiper>
					<div
						className={
							styles.swiperButton + " " + "carousel-swiper-button-next"
						}>
						<button type="button" className={styles.leftArrow__button}>
							<HiArrowRight />
						</button>
					</div>
					<div
						className={
							styles.swiperButton + " " + "carousel-swiper-button-prev"
						}>
						<button type="button" className={styles.rightArrow__button}>
							<HiArrowLeft />
						</button>
					</div>
				</>
			)}
			{isAllView && (
				<div className={styles.itemsContainer} ref={containerRef}>
					{newspapers?.map(
						(papers, index) =>
							papers?.node?.pdf && (
								<motion.a
									key={"newspapers" + index}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									href={papers?.node?.pdf}
									download>
									<div className={styles.itemsContainer__item}>
										{papers?.node?.image ? (
											<div
												className={styles.itemsContainer__item_image}
												ref={ref}>
												<Image
													src={papers.node.image}
													alt="Newspaper Preview Image"
													width={318}
													height={487}
												/>
											</div>
										) : (
											<div className={styles.itemsContainer__item_noImg}>
												<Image
													src={NoImageNewspaper}
													alt="Newspaper Preview Image"
													width={318}
													height={487}
												/>
											</div>
										)}
										<div className={styles.itemsContainer__item_details}>
											<span>
												{papers.node.title}
												{","}
											</span>
											&nbsp;
											{papers.node.pubDate && (
												<span>
													{new Intl.DateTimeFormat("uk-UA", {
														month: "long",
													}).format(new Date(papers.node.pubDate))}{" "}
													{new Date(papers.node.pubDate).getFullYear()}
												</span>
											)}
										</div>
									</div>
								</motion.a>
							)
					)}
					{isPaginationLoading &&
						Array.from(
							new Array(4 - (newspapers?.length ? newspapers?.length % 4 : 0))
						).map((number, idx) => (
							<motion.div
								key={"allNewspapersSkeleton" + idx}
								className={styles.itemsContainer__item_skeleton}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}>
								<div className={styles.itemsContainer__item_skeleton_image}>
									<Skeleton
										variant="rounded"
										height={height - 10}
										width={width}
									/>
								</div>
								<div className={styles.itemsContainer__item_skeleton_details}>
									<Skeleton variant="text" sx={{ fontSize: "18px" }} />
								</div>
							</motion.div>
						))}
				</div>
			)}
			{!isAllView && (
				<div className={styles.showAll}>
					<button
						type="button"
						onClick={() => setAllView(!isAllView)}
						className={styles.showAll_button}>
						Всі випуски
					</button>
				</div>
			)}
		</motion.main>
	)
}
