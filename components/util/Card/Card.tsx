import styles from "./Card.module.scss"

import format from "date-fns/format"

import Link from "next/link"
import RepostIcon from "./../../../assets/repost.svg"
import LeftArrowIcon from "./../../../assets/pagination-left-arrow.svg"
import ClockIcon from "./../../../assets/clock.svg"
import CalendarIcon from "./../../../assets/calendar.svg"

import CustomSwiper from "./../CustomSwiper/CustomSwiper"
import { FC, useEffect, useState } from "react"
import Image from "next/image"

import { tinaField } from "tinacms/dist/react"
import { Maybe, News, NewsConnectionEdges } from "@/tina/__generated__/types"
import {
	NewsCardProps,
	getContentByCategory,
} from "@/components/news/NewsID/NewsCard"
import { AsyncReturnType } from "@/pages/[filename]"
import { NominativeNamesMonths } from "@/components/blocks/News/Sections/Sections"
import { useRouter } from "next/router"
import { Skeleton } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import {
	AnnouncementsCardProps,
	getMoreContent,
} from "@/components/announcements/AnnouncementID/AnnouncementCard"
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery"
import { atcb_action } from "add-to-calendar-button"
import { addOneDay } from "@/components/blocks/Announcements/Sections/Sections"
import { useImageSize } from "react-image-size"
import { RWebShare } from "react-web-share"

interface ICard {
	className: string
	data: AnnouncementsCardProps | NewsCardProps
	dataMore:
		| null
		| NewsConnectionEdges[]
		| AsyncReturnType<typeof getMoreContent>
	classNameSwiper?: string
	backHref: string
	isAnnouncement?: boolean
	isNews?: boolean
	category?: string | undefined | null
	isLoading: boolean
}

const Card: FC<ICard> = ({
	className,
	data,
	dataMore,
	classNameSwiper,
	backHref,
	category,
	isLoading,
	isAnnouncement = false,
	isNews = false,
}) => {
	const router = useRouter()
	const { description, pubDate, image, title, url } = data

	let date
	let formattedDate = ""

	if (pubDate) {
		date = new Date(pubDate)
		if (!isNaN(date.getTime())) {
			formattedDate = format(date, "dd.MM.yyyy HH:mm")
		}
	}
	const tabletMatch = useBetterMediaQuery("(max-width: 980px)") as boolean
	const [loaded, setLoaded] = useState(false)
	const [dimensions] = useImageSize(image as string)

	useEffect(() => {
		if (pubDate) {
			const config = {
				name: `[Reminder] ${title}`,
				startDate: format(new Date(pubDate), "yyyy-MM-dd"),
				startTime: format(new Date(pubDate), "HH:mm"),
				options: ["Google", "Apple", "Outlook.com", "Yahoo", "MicrosoftTeams"],
				timeZone: "Europe/Kyiv",
			}
			const button = document.getElementById("add-calendar-button")
			if (button) {
				button.addEventListener("click", () =>
					atcb_action(config as any, button)
				)
			}
		}
	})

	return (
		<div className={styles.card + " " + className}>
			<div className={styles.card__backward}>
				<a href={backHref}>
					<LeftArrowIcon />
				</a>
			</div>
			<h1
				data-tina-field={tinaField(data, "title")}
				style={!image ? { marginBottom: 50 } : {}}>
				{title}
			</h1>
			{image && (
				<div className={styles.card__previewImg}>
					<Image
						src={image}
						alt={"card"}
						width={Math.min(
							(dimensions?.width && dimensions?.width) || 940,
							940
						)}
						height={Math.min(
							(dimensions?.height && dimensions?.height) || 500,
							500
						)}
						placeholder="blur"
						blurDataURL={
							"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAGWAooDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDKooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/Z"
						}
						className={loaded ? "unblur" : ""}
						onLoadingComplete={() => setLoaded(true)}
						data-tina-field={tinaField(data, "image")}
					/>
				</div>
			)}
			<div className="news-container">
				<div
					className={
						styles.card__repost +
						" " +
						(isAnnouncement ? styles.card__repost_announcement : " ")
					}>
					{!tabletMatch && (
						<>
							<div data-tina-field={tinaField(data, "pubDate")}>
								{formattedDate}
							</div>
							<div className="share-btn" data-url={url} data-title={title}>
								<RWebShare
									data={{
										text: "Shyroke description",
										url: url,
										title: title,
									}}
									onClick={() => console.log("shared successfully!")}
									sites={[
										"facebook",
										"twitter",
										"whatsapp",
										"telegram",
										"mail",
										"copy",
									]}>
									<RepostIcon />
								</RWebShare>
							</div>
						</>
					)}
					{isAnnouncement && tabletMatch && (
						<>
							<div
								data-tina-field={tinaField(data, "pubDate")}
								className={styles.card__repost_wrapper}>
								<div className={styles.card__repost_wrapper_time}>
									<ClockIcon />
									<span className={styles.card__repost_wrapper_time_hours}>
										{date && format(date, "HH")}
									</span>
									<span className={styles.card__repost_wrapper_time_minutes}>
										{date && format(date, "mm")}
									</span>
								</div>
								<div className={styles.card__repost_wrapper_date}>
									<span className={styles.card__repost_wrapper_date_day}>
										{date && format(date, "d")}
									</span>
									<span className={styles.card__repost_wrapper_date_month}>
										{date && NominativeNamesMonths[+format(date, "M") - 1]}
									</span>
									<span className={styles.card__repost_wrapper_date_year}>
										{date && format(date, "yyyy")}
									</span>
								</div>
							</div>
							<div>
								<button
									type="button"
									className={styles.card__repost_addToCalendar}
									id="add-calendar-button">
									<CalendarIcon />
									<span>Додати до календаря</span>
								</button>
							</div>
						</>
					)}
				</div>
				{description && (
					<div
						className={styles.card__info}
						data-tina-field={tinaField(data, "description")}>
						{description.children.map((article: any, articleIndex: number) => (
							<article.type key={"article" + articleIndex}>
								{article.children.map((piece: any, pieceIndex: number) => {
									if (piece.type === "img")
										return (
											<div key={"announcementImage" + pieceIndex}>
												<img
													style={{ width: "100%" }}
													src={piece.url}
													alt={piece.alt || "view image"}
												/>
												{piece.caption && <span>{piece.caption}</span>}
											</div>
										)
									if (piece.type === "text")
										return <span key={"text" + pieceIndex}>{piece.text}</span>
									if (piece.type === "a")
										return (
											<a key={"link" + pieceIndex} href={piece.url}>
												{piece.children.map(
													(linkTitle: any, linkTitleIndex: number) => (
														<span key={"linkTitle" + linkTitleIndex}>
															{linkTitle.text}
														</span>
													)
												)}
											</a>
										)

									if (piece.type === "li") {
										return (
											<li key={"li" + pieceIndex}>
												{piece.children.map((li: any, liIndex: number) => (
													<li.type key={"liItem" + liIndex}>
														{li.children.map(
															(liText: any, liTextIndex: number) =>
																liText.type === "text" && (
																	<span
																		style={{
																			fontWeight: liText.bold && "bold",
																			fontStyle: liText.italic && "italic",
																		}}>
																		{liText.text}
																	</span>
																)
														)}
													</li.type>
												))}
											</li>
										)
									}
									return null
								})}
							</article.type>
						))}
					</div>
				)}
				<div className={styles.card__seeMoreAnn}>
					{isAnnouncement && <h5>Ще анонсовані події</h5>}
					{isNews && <h5>Ще за розділом «{category}»</h5>}
					<div className={styles.card__seeMoreAnn_events}>
						<AnimatePresence mode="wait">
							{!isLoading ? (
								dataMore && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										key="showMoreData">
										{dataMore.map((d, i: number) => {
											let nominativeName
											let date
											if (d?.node?.pubDate) {
												date = new Date(d?.node?.pubDate)
												nominativeName = NominativeNamesMonths[date.getMonth()]
											}
											return (
												<Link
													key={"more" + i}
													href={`/news/${d?.node?._sys.filename}`}>
													<a>
														{nominativeName && date && (
															<p>
																{format(date, "d")} {nominativeName}{" "}
																{format(date, "yyyy, hh:mm")}
															</p>
														)}
														<h5>{d?.node?.title}</h5>
													</a>
												</Link>
											)
										})}
									</motion.div>
								)
							) : (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									key="showMoreDataSkeleton">
									{Array.from(new Array(3)).map((n, index) => (
										<div
											key={"seeMoreSkeleton" + index}
											className={styles.card__seeMoreAnn_skeleton}>
											<Skeleton
												width={165}
												variant="text"
												sx={{ fontSize: "16px" }}
											/>
											<Skeleton variant="text" sx={{ fontSize: "16px" }} />
											<Skeleton variant="text" sx={{ fontSize: "16px" }} />
										</div>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					{dataMore && dataMore?.length === 5 && (
						<Link
							href={{
								pathname: `${backHref}`,
								query: {
									category,
								},
							}}
							as={`${backHref}/`}>
							<button type="button">Переглянути ще</button>
						</Link>
					)}
				</div>
			</div>
			<div className={styles.card__seeMore}>
				<div className="news-container">
					<h1>Дивіться ще</h1>
					<CustomSwiper
						className={styles.card__seeMore_swiper + " " + classNameSwiper}
						data={dataMore}
						isNext={false}
						category={category}
					/>
				</div>
			</div>
		</div>
	)
}

export default Card
