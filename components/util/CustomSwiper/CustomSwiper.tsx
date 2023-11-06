import { FC, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { HiArrowLeft } from "react-icons/hi"
import { HiArrowRight } from "react-icons/hi"
import styles from "./CustomSwiper.module.scss"

import "swiper/css"
import "swiper/css/navigation"
import { useRouter } from "next/router"
import Image from "next/image"
import Skeleton from "@mui/material/Skeleton"
import { Maybe, NewsConnectionEdges } from "@/tina/__generated__/types"
import { tinaField } from "tinacms/dist/react"
import Link from "next/link"
import { AsyncReturnType } from "@/pages/[filename]"
import { getContentByCategory } from "@/components/news/NewsID/NewsCard"

import { format } from "date-fns"
import { getMoreContent } from "@/components/announcements/AnnouncementID/AnnouncementCard"

interface ICustomSwiper {
	className?: string
	positionText?: Maybe<string> | undefined
	isNext?: boolean
	data: null | NewsConnectionEdges[] | AsyncReturnType<typeof getMoreContent>
	isLoading?: boolean
	category?: string | null | undefined
}

const CustomSwiper: FC<ICustomSwiper> = ({
	className,
	positionText,
	data,
	isLoading,
	isNext = true,
	category,
}) => {
	const router = useRouter()
	const [loaded, setLoaded] = useState<number[]>([])

	const LIMIT = 132

	return (
		<div className={styles.wrapper}>
			<Swiper
				navigation={{
					nextEl: ".image-swiper-button-next",
					prevEl: ".image-swiper-button-prev",
					disabledClass: "swiper-button-disabled",
				}}
				modules={[Navigation]}
				slidesPerView={"auto"}>
				{!isLoading &&
					data &&
					data.length > 0 &&
					data.map((d, index: number) => {
						let count = 0
						if (d && d.node)
							return (
								<SwiperSlide
									key={index}
									style={{
										textAlign:
											(positionText as "left" | "right" | "center") || "left",
									}}
									className={styles.newsSwiper__slide}>
									<Link
										href={{
											pathname: `/news/${d.node._sys.filename}`,
											query: {
												category: category,
											},
										}}>
										<a>
											<>
												{d.node.image && (
													<>
														<Image
															src={d.node.image}
															alt={"img" + index}
															width={408}
															height={242}
															blurDataURL={d.node.image}
															placeholder="blur"
															className={loaded ? "unblur" : ""}
														/>
													</>
												)}
												<h5>
													{d.node.title.slice(0, 60)}
													{d.node.title.length >= 60 && "..."}
												</h5>
												<div>
													{d?.node?.description &&
														d?.node?.description?.children.map(
															(article: any, index: number) => {
																const remainingChars = LIMIT - count
																let isOver = false
																const slicedText = article.children
																	.map(
																		(paragraphChild: any, childIdx: number) => {
																			if (count > LIMIT) return
																			const text = paragraphChild.text
																			if (text)
																				if (count + text.length <= LIMIT) {
																					count += text.length
																					return text
																				} else {
																					const remainingText = text.slice(
																						0,
																						remainingChars
																					)
																					count += remainingChars
																					isOver = true
																					return remainingText
																				}
																		}
																	)
																	.join("")
																if (remainingChars !== 0) {
																	return (
																		<p key={"paragraph" + index}>
																			{slicedText}
																			{isOver && "..."}
																		</p>
																	)
																}
															}
														)}
												</div>
												{isNext && (
													<button
														type="button"
														onClick={() =>
															router.push(`/news/${d?.node?._sys.filename}`)
														}>
														Далі
													</button>
												)}
												{!isNext && d.node.pubDate && (
													<p>
														{format(
															new Date(d.node.pubDate),
															"dd.MM.yyyy HH:mm"
														)}
													</p>
												)}
											</>
										</a>
									</Link>
								</SwiperSlide>
							)
					})}
				{(isLoading || !data) &&
					Array.from(new Array(4)).map((slide, index) => (
						<SwiperSlide
							key={"skeleton" + index}
							style={{
								textAlign:
									(positionText as "left" | "right" | "center") || "left",
							}}
							className={styles.newsSwiper__slide}>
							<Skeleton variant="rectangular" height={242} animation="wave" />
							<Skeleton width="60%" variant="text" sx={{ fontSize: "22px" }} />
							<Skeleton sx={{ fontSize: "15px" }} />
							<Skeleton sx={{ fontSize: "15px" }} />
							<Skeleton sx={{ fontSize: "15px" }} />
						</SwiperSlide>
					))}
			</Swiper>
			<div className="swiper-button image-swiper-button-next">
				<button type="button" className={styles.leftArrow__button}>
					<HiArrowRight />
				</button>
			</div>
			<div className="swiper-button image-swiper-button-prev">
				<button type="button" className={styles.rightArrow__button}>
					<HiArrowLeft />
				</button>
			</div>
		</div>
	)
}

export default CustomSwiper
