import styles from "./Sections.module.scss"
import ClockIcon from "./../../../../assets/clock.svg"
import CalendarIcon from "./../../../../assets/calendar.svg"
import ArrowRightIcon from "./../../../../assets/arrow-right.svg"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import {
	DepartmentPeopleComponentsVacanciesSections,
	InputMaybe,
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

const PAGINATION_COUNT = 5

type TGetVacanciesByFilter = {
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

export const getVacanciesByFilter = async ({
	setLoading,
	startDate,
	endDate,
	search,
	cursor = null,
	setCursor,
	setNextPage,
	showSkeleton = true,
	setPaginationLoading,
}: TGetVacanciesByFilter) => {
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
	if (cursor === "") return
	if (!search && !startDate && !endDate) {
		const vacanciesResponse = await client.queries.vacanciesConnection({
			first: PAGINATION_COUNT,
			sort: "pubDate",
			last: 1,
			before: cursor,
			filter: {
				pubDate: {
					before: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
				},
				hideVac: {
					eq: false,
				},
			},
		})
		setCursor(vacanciesResponse.data.vacanciesConnection.pageInfo.endCursor)
		setNextPage(
			vacanciesResponse.data.vacanciesConnection.pageInfo.hasPreviousPage
		)
		showSkeleton
			? setLoading(false)
			: setPaginationLoading && setPaginationLoading(false)
		return vacanciesResponse.data.vacanciesConnection.edges || null
	}
	let vacancies: VacanciesConnectionEdges[] = []
	let totalCount = 0
	let vacanciesConnection
	let _cursor = cursor
	do {
		const vacanciesResponse = await client.queries.vacanciesConnection({
			first: PAGINATION_COUNT,
			filter: {
				hideVac: {
					eq: false,
				},
				...(filter as InputMaybe<VacanciesFilter>),
			},
			last: 1,
			sort: "pubDate",
			before: _cursor || "",
		})
		vacanciesConnection = vacanciesResponse.data.vacanciesConnection
		_cursor = vacanciesConnection.pageInfo.endCursor

		if (search) {
			vacanciesConnection.edges?.forEach(n => {
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
					vacancies.push(n as VacanciesConnectionEdges)
					totalCount++
				}
			})
		}
	} while (
		vacanciesConnection.edges?.length &&
		totalCount <
			Math.min(PAGINATION_COUNT, vacanciesConnection.edges?.length) &&
		vacanciesConnection.pageInfo.hasPreviousPage
	)

	setCursor(vacanciesConnection.pageInfo.endCursor)
	setNextPage(vacanciesConnection.pageInfo.hasPreviousPage)

	showSkeleton
		? setLoading(false)
		: setPaginationLoading && setPaginationLoading(false)

	if (search) {
		return vacancies || null
	} else {
		return vacanciesConnection?.edges || null
	}
}

export const Sections = ({
	data,
}: {
	data:
		| PageComponentsVacanciesSections
		| DepartmentPeopleComponentsVacanciesSections
}) => {
	const containerRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		layoutEffect: false,
	})

	const [vacancies, setVacancies] = useState<null | AsyncReturnType<
		typeof getVacanciesByFilter
	>>(null)

	const [isLoading, setLoading] = useState(false)
	const [cursor, setCursor] = useState<string | null>(null)
	const [hasNextPage, setNextPage] = useState(true)
	const [isPaginationLoading, setPaginationLoading] = useState(false)
	const [y, setY] = useState(0)

	const { date, search, onChangeDate, onChangeSearch } = useFilter()
	const mobileMatch = useBetterMediaQuery("(max-width: 420px)") as boolean

	useEffect(() => {
		scrollYProgress.onChange(v => setY(v))
	}, [scrollYProgress])

	useEffect(() => {
		const getContent = async () => {
			const vac = await getVacanciesByFilter({
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
			if (vac)
				if (vacancies) {
					setVacancies([...vacancies, ...vac])
				} else {
					setVacancies(vac)
				}
		}

		if (y >= 0.9) getContent()
	}, [y])

	useEffect(() => {
		onChangeDate({ startDate: null, endDate: null })
		onChangeSearch(null)
		const getContent = async () => {
			const vac = await getVacanciesByFilter({
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
			if (vac) setVacancies(vac)
		}
		getContent()
	}, [])

	useEffect(() => {
		const getContent = async () => {
			const vac = await getVacanciesByFilter({
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
			if (vac) setVacancies(vac)
		}
		getContent()
	}, [search, date])

	if (vacancies && vacancies.length === 0)
		return (
			<div className={styles.noVacancies}>
				<div className="container">
					<p>
						Вакансій{" "}
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
		<motion.main className={styles.vacancies}>
			<motion.div className="container">
				<motion.div className={styles.vacancies__inner}>
					<div className={styles.vacancies__list}>
						{isLoading &&
							Array.from(new Array(3)).map((number, idx) => (
								<motion.div
									key={"filterVacanciesSkeleton" + idx}
									className={styles.vacancies__list_item_skeleton}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}>
									<div>
										<Skeleton variant="text" sx={{ fontSize: "20px" }} />
										<Skeleton variant="text" sx={{ fontSize: "20px" }} />
									</div>
									<ArrowRight />
								</motion.div>
							))}
						{!isLoading &&
							vacancies &&
							vacancies.map((v, index) => (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									key={"vacancy" + index}
									ref={containerRef}
									className={styles.vacancies__list_item}>
									<Link href={`/vacancies/${v?.node?._sys.filename}`}>
										<a>
											<span>
												{v?.node?.title.slice(0, mobileMatch ? 100 : undefined)}{" "}
												{mobileMatch &&
													v?.node?.title.length &&
													v?.node?.title.length > 100 &&
													"..."}
											</span>
											<ArrowRight />
										</a>
									</Link>
								</motion.div>
							))}
					</div>
					{isPaginationLoading &&
						vacancies?.length &&
						vacancies.length % PAGINATION_COUNT == 0 && (
							<div className={styles.vacancies__loader}>
								<PuffLoader color="#309C54" />
							</div>
						)}
				</motion.div>
			</motion.div>
		</motion.main>
	)
}
