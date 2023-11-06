import { useFilter } from "@/context/FilterContext"
import styles from "./Sections.module.scss"
import NewsSection from "./components/NewsSection/NewsSection"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import {
	DepartmentPeopleComponentsNewsSections,
	InputMaybe,
	NewsConnectionEdges,
	NewsFilter,
	PageComponentsNewsSections,
	PageComponentsNewsSectionsNewsSection,
} from "@/tina/__generated__/types"
import client from "@/tina/__generated__/client"
import { AsyncReturnType } from "@/pages/[filename]"
import { tinaField } from "tinacms/dist/react"
import Image from "next/image"
import { format } from "date-fns"
import cn from "classnames"
import { Skeleton, Typography } from "@mui/material"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { PuffLoader } from "react-spinners"
import NewsSectionLoading from "./components/NewsSectionLoading/NewsSectionLoading"
import { ParsedUrlQuery } from "querystring"
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery"
import { addOneDay, minusOneDay } from "../../Announcements/Sections/Sections"
import Link from "next/link"

const PAGINATION_COUNT = 5

type TFilter = {
	templates?: any
	pubDate?: any
}

type TGetNewsByFilter = {
	setLoading: (loading: boolean) => void
	startDate?: Date | null
	endDate?: Date | null
	category?: string | null
	search?: string | null
	cursor: string | null
	setCursor: (value: string | null) => void
	setNextPage: Dispatch<SetStateAction<boolean>>
	showSkeleton?: boolean
	setPaginationLoading?: (value: boolean) => void
}

export const NominativeNamesMonths = [
	"січня",
	"лютого",
	"березня",
	"квітня",
	"травня",
	"червня",
	"липня",
	"серпня",
	"вересня",
	"жовтня",
	"листопада",
	"грудня",
]

export const getNewsByFilter = async ({
	setLoading,
	startDate,
	endDate,
	category,
	search,
	cursor = null,
	setCursor,
	setNextPage,
	showSkeleton = true,
	setPaginationLoading,
}: TGetNewsByFilter) => {
	showSkeleton
		? setLoading(true)
		: setPaginationLoading && setPaginationLoading(true)

	const filter: TFilter = {}

	if (category) {
		filter.templates = {
			category: {
				category: {
					newsCategories: {
						category: {
							in: [category],
						},
					},
				},
			},
		}
	}

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

	let news: NewsConnectionEdges[] = []
	let totalCount = 0
	let newsConnection
	let _cursor = cursor
	do {
		const newsResponse = await client.queries.newsConnection({
			first: PAGINATION_COUNT,
			filter: {
				hideNews: {
					eq: false,
				},
				...(filter as InputMaybe<NewsFilter>),
			},
			sort: "pubDate",
			last: 1,
			before: _cursor || "",
		})
		newsConnection = newsResponse.data.newsConnection
		_cursor = newsConnection.pageInfo.endCursor

		if (search) {
			newsConnection.edges?.forEach(n => {
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
					news.push(n as NewsConnectionEdges)
					totalCount++
				}
			})
		}
	} while (
		newsConnection.edges?.length &&
		totalCount < Math.min(PAGINATION_COUNT, newsConnection.edges?.length) &&
		newsConnection.pageInfo.hasNextPage
	)
	setCursor(newsConnection.pageInfo.endCursor)
	setNextPage(newsConnection.pageInfo.hasNextPage)
	showSkeleton
		? setLoading(false)
		: setPaginationLoading && setPaginationLoading(false)

	if (search) {
		return news || null
	} else {
		return newsConnection?.edges || null
	}
}

export const getNewsByCategory = async (category: string | undefined) => {
	if (category) {
		const newsResponse = await client.queries.newsConnection({
			first: PAGINATION_COUNT,
			sort: "pubDate",
			last: 1,
			filter: {
				pubDate: {
					before: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
				},
				hideNews: {
					eq: false,
				},
				templates: {
					category: {
						category: {
							newsCategories: {
								category: {
									in: [category],
								},
							},
						},
					},
				},
			},
		})
		console.log("response:", newsResponse)
		return newsResponse.data.newsConnection.edges
	}
}

export const Sections = ({
	data,
}: {
	data: PageComponentsNewsSections | DepartmentPeopleComponentsNewsSections
}) => {
	const containerRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		layoutEffect: false,
	})
	console.log("data", data)
	const {
		category,
		date,
		search,
		onChangeCategory,
		onChangeDate,
		onChangeSearch,
	} = useFilter()

	const [news, setNews] = useState<
		null | AsyncReturnType<typeof getNewsByCategory>[]
	>(null)

	const [filterNews, setFilterNews] = useState<null | AsyncReturnType<
		typeof getNewsByFilter
	>>(null)

	const [isFiltered, setFiltered] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isPaginationLoading, setPaginationLoading] = useState(false)

	const [cursor, setCursor] = useState<string | null>(null)
	const [hasNextPage, setNextPage] = useState(true)
	const [y, setY] = useState(0)

	const mobileMatch = useBetterMediaQuery("(max-width: 420px)") as boolean
	const tabletMatch = useBetterMediaQuery("(max-width: 690px)") as boolean

	useEffect(() => {
		onChangeCategory(null)
		onChangeDate({ startDate: null, endDate: null })
		onChangeSearch(null)
	}, [])

	useEffect(() => {
		scrollYProgress.onChange(v => setY(v))
	}, [scrollYProgress])

	useEffect(() => {
		const getContent = async () => {
			const news = await getNewsByFilter({
				setLoading,
				startDate: date.startDate,
				endDate: date.endDate,
				category,
				search,
				cursor,
				setCursor,
				setNextPage,
				showSkeleton: false,
				setPaginationLoading,
			})
			if (news)
				if (filterNews) {
					setFilterNews([...filterNews, ...news] as NewsConnectionEdges[])
				} else {
					setFilterNews(news)
				}
		}

		if (y >= 0.9 && hasNextPage) getContent()
	}, [y])

	const { newsSection } = data

	useEffect(() => {
		const getContent = async () => {
			if (newsSection) {
				const arrayNews: AsyncReturnType<typeof getNewsByCategory>[] = []
				setLoading(true)
				for (const news of newsSection) {
					const newsResponse = await getNewsByCategory(news?.category?.category)
					if (newsResponse) arrayNews.push(newsResponse)
				}
				setLoading(false)
				setNews(arrayNews)
			}
		}
		!isFiltered && getContent()
	}, [isFiltered, newsSection])

	useEffect(() => {
		if (!date.startDate && !date.endDate && !category && !search) {
			setFiltered(false)
			setNews(null)
			setFilterNews(null)
		} else {
			setFiltered(true)
			const getContent = async () => {
				const newsResponse = await getNewsByFilter({
					setLoading,
					startDate: date.startDate,
					endDate: date.endDate,
					category,
					search,
					cursor: null,
					setCursor,
					setNextPage,
				})
				if (newsResponse) setFilterNews(newsResponse)
			}
			getContent()
		}
	}, [date, category, search])

	if (filterNews?.length === 0 && isFiltered)
		return (
			<section className={styles.freshNews}>
				<div className="container">
					<p>
						Новин{" "}
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
						{category
							? `за категорією «${category}»`
							: search && ` по запиту "${search}"`}{" "}
						немає
					</p>
				</div>
			</section>
		)

	if (news?.length === 0)
		return (
			<section className={styles.freshNews}>
				<div className="container">
					<p>Новин немає</p>
				</div>
			</section>
		)

	return (
		<motion.section className={styles.freshNews}>
			{isLoading ? (
				<motion.section
					className={styles.indentContainer}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key={"freshNewsContainerSkeleton"}>
					<motion.div className={cn("container", styles.filterContainer)}>
						<motion.div>
							{!isFiltered && <NewsSectionLoading />}
							{isFiltered &&
								Array.from(new Array(3)).map((number, idx) => (
									<motion.div
										key={"filterSkeleton" + idx}
										className={styles.filterContainer__skeletonContainer}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}>
										<Skeleton variant="rounded" width={190} height={190} />
										<div
											className={
												styles.filterContainer__skeletonContainer_wrapper
											}>
											<div>
												<Typography variant="h1">
													<Skeleton />
												</Typography>
												<Typography variant="body1">
													<Skeleton />
												</Typography>
												<Typography variant="caption">
													<Skeleton />
												</Typography>
											</div>
											{tabletMatch && (
												<div>
													<Typography variant="caption">
														<Skeleton width={110} />
													</Typography>
												</div>
											)}
										</div>
									</motion.div>
								))}
						</motion.div>
					</motion.div>
				</motion.section>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key={"freshNewsContainer"}
					className="container">
					{isFiltered && (
						<motion.section
							className={styles.indentContainer}
							ref={containerRef}>
							<div className={cn(styles.filterContainer)}>
								<AnimatePresence mode="wait">
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}>
										{filterNews?.map((n, nIdx) => {
											let count = 0
											return (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													key={"filterNews" + nIdx}
													className={styles.filterContainer__item}>
													{n?.node?._sys.filename && (
														<Link
															href={{
																pathname: "/news/" + n?.node?._sys.filename,
																query: {
																	category:
																		n?.node?.templates &&
																		n.node.templates[0]?.category?.category,
																},
															}}>
															<a>
																<>
																	{n?.node?.image && (
																		<Image
																			src={n?.node?.image}
																			height={190}
																			width={190}
																		/>
																	)}
																	<div
																		className={styles.filterContainer__details}>
																		<div
																			className={
																				styles.filterContainer__details_wrapper
																			}>
																			{n?.node?.title && (
																				<h1>
																					{n?.node?.title.slice(
																						0,
																						mobileMatch ? 50 : undefined
																					)}{" "}
																					{mobileMatch &&
																						n?.node?.title.length > 50 &&
																						"..."}
																				</h1>
																			)}
																			{n?.node?.description && (
																				<div
																					className={
																						styles.filterContainer__details_description
																					}>
																					{n?.node?.description.children.map(
																						(paragraph: any, pIdx: number) => {
																							if (count <= 180) {
																								const remainingChars =
																									180 - count
																								let isOver = false
																								const slicedText =
																									paragraph.children.map(
																										(paragraphChild: any) => {
																											const text =
																												paragraphChild.text
																											if (text)
																												if (
																													count + text.length <=
																													180
																												) {
																													count += text.length
																													return text
																												} else {
																													const remainingText =
																														text.slice(
																															0,
																															remainingChars
																														)
																													count +=
																														remainingChars
																													isOver = true
																													return remainingText
																												}
																										}
																									)
																								if (remainingChars !== 0) {
																									return (
																										<p key={"paragraph" + pIdx}>
																											{slicedText}
																											{isOver && "..."}
																										</p>
																									)
																								}
																							}
																						}
																					)}{" "}
																				</div>
																			)}
																		</div>
																		{n?.node?.pubDate && (
																			<span>
																				{!tabletMatch
																					? format(
																							new Date(n.node.pubDate),
																							"dd.MM.yyyy HH:mm"
																					  )
																					: format(
																							new Date(n.node.pubDate),
																							`HH:mm, d ${
																								NominativeNamesMonths[
																									new Date(
																										n.node.pubDate
																									).getMonth()
																								]
																							}`
																					  )}
																			</span>
																		)}
																	</div>
																</>
															</a>
														</Link>
													)}
												</motion.div>
											)
										})}
										{isPaginationLoading &&
											filterNews?.length &&
											filterNews.length % PAGINATION_COUNT === 0 && (
												<div className={styles.filterContainer__loader}>
													<PuffLoader color="#309C54" />
												</div>
											)}
									</motion.div>
								</AnimatePresence>
							</div>
						</motion.section>
					)}
					{!isFiltered &&
						news &&
						news.map((section, sIdx) => {
							if (newsSection)
								switch (newsSection[sIdx]?.variantNews) {
									case "1":
										return (
											<NewsSection
												_news={section}
												headline={newsSection[sIdx]?.category?.category}
												key={"section" + sIdx}
												data-tina-field={tinaField(
													newsSection[
														sIdx
													] as PageComponentsNewsSectionsNewsSection
												)}
											/>
										)
									case "2":
										return (
											<NewsSection
												_news={section}
												headline={newsSection[sIdx]?.category?.category}
												isReversed={true}
												hasDescription={false}
												key={"section" + sIdx}
												data-tina-field={tinaField(
													newsSection[
														sIdx
													] as PageComponentsNewsSectionsNewsSection
												)}
											/>
										)
									case "3":
										return (
											<NewsSection
												_news={section}
												headline={newsSection[sIdx]?.category?.category}
												hasLine={false}
												key={"section" + sIdx}
												data-tina-field={tinaField(
													newsSection[
														sIdx
													] as PageComponentsNewsSectionsNewsSection
												)}
											/>
										)
									case "4":
										return (
											<NewsSection
												_news={section}
												headline={newsSection[sIdx]?.category?.category}
												isReversed={true}
												hasDescription={false}
												isDoublyPreview={true}
												key={"section" + sIdx}
												data-tina-field={tinaField(
													newsSection[
														sIdx
													] as PageComponentsNewsSectionsNewsSection
												)}
											/>
										)
									default:
										return <></>
								}
						})}
				</motion.div>
			)}
		</motion.section>
	)
}
