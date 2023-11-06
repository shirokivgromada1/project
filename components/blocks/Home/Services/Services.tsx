"use client"
import styles from "./Services.module.scss"
import { Interweave } from "interweave"
import { FC, useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import AnimateHeight from "react-animate-height"
import { Skeleton } from "@mui/material"
import {
	DepartmentPeopleComponentsServices,
	Maybe,
	PageComponentsServices,
	PageComponentsServicesService,
} from "@/tina/__generated__/types"
import { tinaField } from "tinacms/dist/react"
import Link from "next/link"
import { ReactSVG } from "react-svg"
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery"
import axios from "axios"

type SvgsState = {
	[url: string]: string
}

export const Services = ({
	data,
}: {
	data: PageComponentsServices | DepartmentPeopleComponentsServices
}) => {
	const [isView, setView] = useState(false)
	const match = useBetterMediaQuery("(max-width: 1300px)")

	const { title, service: services } = data

	return (
		<div className={styles.services}>
			<div className="container">
				<h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
				<div className={styles.services__wrapper}>
					<div className={styles.services__inner}>
						{services &&
							services.slice(0, match ? 3 : 4).map(
								(s, index) =>
									s && (
										<Link
											key={"services" + index}
											data-tina-field={tinaField(s)}
											href={`${s.serviceLink}`}>
											<a className={styles.services__inner_service}>
												{s.serviceIcon && (
													<img src={s.serviceIcon} alt="service" />
												)}
												{s.serviceTitle && <h5>{s.serviceTitle}</h5>}
											</a>
										</Link>
									)
							)}
					</div>
					<AnimateHeight duration={500} height={isView ? "auto" : 0}>
						<div
							className={styles.services__inner + " " + styles.services__all}>
							{services &&
								services.slice(match ? 3 : 4, undefined).map(
									(s, index) =>
										s && (
											<Link
												key={"services" + index}
												data-tina-field={tinaField(s)}
												href={`${s.serviceLink}`}>
												<a className={styles.services__inner_service}>
													{s.serviceIcon && (
														<img src={s.serviceIcon} alt="service" />
													)}
													{s.serviceTitle && <h5>{s.serviceTitle}</h5>}
												</a>
											</Link>
										)
								)}
						</div>
					</AnimateHeight>
				</div>
				{services && services.length > (match ? 3 : 4) && (
					<div className={styles.services__showMore}>
						<button type="button" onClick={() => setView(prev => !prev)}>
							{isView ? "Згорнути" : "Дивитися все"}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
