import { useMediaQuery } from "usehooks-ts"
import styles from "./NewsSection.module.scss"
import { AsyncReturnType } from "@/pages/[filename]"
import { NominativeNamesMonths, getNewsByCategory } from "../../Sections"
import { FC } from "react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery"

interface INewsSection {
	_news: AsyncReturnType<typeof getNewsByCategory>
	headline: string | undefined
	isReversed?: boolean
	hasDescription?: boolean
	hasLine?: boolean
	isDoublyPreview?: boolean
}

const NewsSection: FC<INewsSection> = ({
	_news,
	headline = "",
	isReversed = false,
	hasDescription = true,
	hasLine = true,
	isDoublyPreview = false,
	...props
}) => {
	const matches = useBetterMediaQuery("(max-width: 1300px)")
	const mobileMatch = useBetterMediaQuery("(max-width: 420px)") as boolean

	return (
		<div {...props}>
			{headline && <h1 className={styles.headline}>{headline}</h1>}{" "}
			<div
				className={
					styles.newsSection +
					" " +
					(isReversed ? styles.newsSectionReversed : "") +
					" " +
					(!hasLine ? styles.lineHidden : "") +
					" " +
					(isDoublyPreview ? styles.newsSectionDoublyPreview : "") +
					" " +
					(matches && headline && styles.newsSectionTablet)
				}>
				{_news &&
					_news.slice(0, isDoublyPreview ? 5 : 4).map((n, index) => {
						let count = 0
						if (n)
							return (
								<>
									{headline && index === 1 && matches && (
										<h1 className={styles.headlineMobile}>{headline}</h1>
									)}{" "}
									<Link
										href={{
											pathname: `/news/${n.node?._sys.filename}`,
											query: {
												category: headline,
											},
										}}>
										<a
											key={"news" + index}
											style={{
												gridArea: index === 0 ? "preview" : "news" + index,
												width: "100%",
											}}>
											<>
												{n?.node?.image && (
													<Image
														width={330}
														height={206}
														objectFit="cover"
														src={n?.node?.image}
														alt={`img` + index}
													/>
												)}
												<div>
													<h1
														style={!n?.node?.image ? { marginBottom: 20 } : {}}>
														{n?.node?.title.slice(0, 60)}
														{n?.node?.title &&
															n?.node?.title.length > 60 &&
															"... "}
													</h1>
													<div>
														{index === 0 &&
															(hasDescription || matches) &&
															n?.node?.description.children.map(
																(paragraph: any, pIdx: number) => {
																	const remainingChars = 150 - count
																	let isOver = false
																	const slicedText = paragraph.children
																		.map(
																			(
																				paragraphChild: any,
																				childIdx: number
																			) => {
																				const text = paragraphChild.text
																				if (count > 150) return
																				if (text)
																					if (count + text.length <= 150) {
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
																			<p key={"paragraph" + pIdx}>
																				{slicedText}
																				{isOver && "..."}
																			</p>
																		)
																	}
																}
															)}
														{n?.node?.pubDate && (
															<span>
																{!mobileMatch
																	? format(
																			new Date(n.node.pubDate),
																			"dd.MM.yyyy HH:mm"
																	  )
																	: format(
																			new Date(n.node.pubDate),
																			`HH:mm, d ${
																				NominativeNamesMonths[
																					new Date(n.node.pubDate).getMonth()
																				]
																			}`
																	  )}
															</span>
														)}
													</div>
												</div>
											</>
										</a>
									</Link>
								</>
							)
					})}
			</div>
		</div>
	)
}

export default NewsSection
