import { useUser } from "@/context/UserContext"
import Button from "../../Button/Button"
import styles from "./Viber.module.scss"
import ViberIcon from "@/assets/viber.svg"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

type Props = {}

const isBrowser = typeof window !== "undefined"

const Viber = (props: Props) => {
	const { userId } = useAuth()
	const { hasViber, onChangeViber } = useUser()

	const router = useRouter()

	useEffect(() => {
		const socket = new WebSocket(
			`ws://localhost:8000/ws/notify_viber_id/${userId}/`
		)

		socket.onmessage = event => {
			const data = JSON.parse(event.data)
			if (!!data.viber_id) {
				onChangeViber(!!data.viber_id)
			}
		}

		return () => {
			socket.close()
		}
	}, [router.asPath])

	const handleClick = () => {
		window.open(`viber://pa?chatURI=shyrokebot&context=${userId}`, "_blank")
	}

	return (
		<div className={styles.viberContainer}>
			<div className={styles.viberContainer__label}>
				<label>Viber-помічник</label>
				<p>
					Тут відображається ваш вайбер помічнік, якого ви підключили чи не
					підключили під час реєстрації
				</p>
			</div>
			<div className={styles.viberContainer__control}>
				<div className={styles.viberContainer__control_icon}>
					<ViberIcon />
					{!hasViber && (
						<span>
							Ви не підключили цю функцію, але ви можете це зробити зараз
						</span>
					)}
					{hasViber && (
						<span>Все добре ви вже стали друзями з нашим помічником</span>
					)}
				</div>
				{!hasViber && (
					<Button type="button" onClick={handleClick}>
						Підключити помичніка
					</Button>
				)}
			</div>
		</div>
	)
}

export default Viber
