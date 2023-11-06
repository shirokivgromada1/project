import Link from "next/link"
import styles from "./Panel.module.scss"
import Notification from "./../../../../assets/notification.svg"
import Settings from "./../../../../assets/settings.svg"
import Exit from "./../../../../assets/exit.svg"
import Burger from "./../../../../assets/burger.svg"
import classNames from "classnames"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/context/UserContext"
import axios from "axios"
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery"
import { Dispatch, SetStateAction } from "react"

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>
}

const Panel = ({ setOpen }: Props) => {
	const { logOut } = useAuth()
	const { clear } = useUser()

	const mobileMatch = useBetterMediaQuery("(max-width: 700px)")

	const handleExit = () => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}/`,
				{
					refresh_token: localStorage.getItem("refresh_token"),
				},
				{
					headers: {
						Authorization: "JWT " + localStorage.getItem("access_token"),
						"Content-Type": "application/json",
						accept: "application/json",
					},
					timeout: 5000,
				}
			)
			.then(() => {
				localStorage.removeItem("access_token")
				localStorage.removeItem("refresh_token")
				logOut()
				clear()
			})
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<div className={classNames(styles.panel)}>
			<div className="container">
				{!mobileMatch ? (
					<div className={styles.panel__notification}>
						<Link href={"/dashboard/messages"}>
							<a>
								<span className={styles.panel__notification_icon}>
									<Notification />
								</span>
								<span className={styles.panel__notification_text}>
									Повідомлення
								</span>
							</a>
						</Link>
					</div>
				) : (
					<div className={styles.panel__burger}>
						<button type="button" onClick={() => setOpen(prev => !prev)}>
							<Burger />
						</button>
					</div>
				)}
				<div className={styles.panel__dashboard}>Особистий кабінет</div>
				<div className={styles.panel__control}>
					<Link href={"/dashboard/settings"}>
						<a>
							<Settings />
						</a>
					</Link>
					<button onClick={handleExit}>
						<Exit />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Panel
