import { Layout } from "@/components/layout/layout"
import React, { useEffect, useState } from "react"
import { ContentQueryQuery } from "@/tina/__generated__/types"
import Panel from "./Panel/Panel"
import axios from "axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import { toast } from "react-toastify"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
import { BounceLoader } from "react-spinners"
import styles from "./Layout.module.scss"
import axiosInstance from "@/interceptors/axios"
import { useUser } from "@/context/UserContext"
import useIdleTimeout from "@/hooks/useIdleTimeout"
import classNames from "classnames"
import Report from "./../../../assets/report.svg"
import Help from "./../../../assets/help.svg"
import Offer from "./../../../assets/offer.svg"
import Message from "./../../../assets/message.svg"
import Link from "next/link"
const DashboardLayout = ({
	data,
	children,
}: {
	data?: ContentQueryQuery
	children: React.ReactNode
}) => {
	const router = useRouter()
	const {
		onChangeUserId,
		isAuth,
		onChangeLoading,
		onChangeAuth,
		logOut,
		isLoading,
	} = useAuth()
	const { isIdle } = useIdleTimeout()
	const {
		onChangePhoneNumber,
		onChangeLocality,
		onChangeStatus,
		onChangeViber,
	} = useUser()

	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (localStorage.getItem("access_token") === null) {
			router.push("/sign-in")
		} else {
			onChangeLoading(true)
			axiosInstance
				.get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.ME}/`, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(response => {
					const { message, data } = response.data

					onChangeUserId(data.id)
					onChangePhoneNumber(data.phoneNumber)
					onChangeLocality(data.locality)
					onChangeStatus(data.vulnerableGroup)
					onChangeViber(data.hasViber)

					toast.success(message, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					})
					onChangeAuth(true)
				})
				.catch(err => {
					console.info(err)
				})
				.finally(() => {
					onChangeLoading(false)
				})
		}
	}, [isAuth])

	useEffect(() => {
		if (isIdle) {
			axios
				.get(
					`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}/`,
					{
						withCredentials: true,
					}
				)
				.then(response => {
					const { message } = response.data
					toast.success(message, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					})
					logOut()
					router.push("/sign-in")
				})
				.catch(err => {
					toast.error(err.response.data.message, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					})
				})
		}
	}, [isIdle, isAuth])

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}>
				<AnimatePresence mode="wait">
					{(isLoading || !isAuth) && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							style={{
								height: "100vh",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<BounceLoader color="#36d7b7" />
						</motion.div>
					)}
					{!isLoading && isAuth && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							<Layout data={data?.global as any}>
								<Panel setOpen={setOpen} />
								<div className={styles.dashboard}>
									<div
										className={classNames(styles.dashboard_menu)}
										style={{ left: open ? "0" : "-100%" }}>
										<div>
											<h1>Зворотній зв’язок</h1>
										</div>
										<ul>
											<li>
												<Link href={"/#"}>
													<a>
														<span>
															<Report />
														</span>
														<p>Відгук про роботу</p>
													</a>
												</Link>
											</li>
											<li>
												<Link href={"/#"}>
													<a>
														<span>
															<Help />
														</span>
														<p>Потрібна допомога</p>
													</a>
												</Link>
											</li>
											<li>
												<Link href={"/#"}>
													<a>
														<span>
															<Offer />
														</span>
														<p>Пропозиції</p>
													</a>
												</Link>
											</li>
											<li>
												<Link href={"/#"}>
													<a>
														<span>
															<Message />
														</span>
														<p>Повідомлення</p>
													</a>
												</Link>
											</li>
										</ul>
										<div className={styles.dashboard_menu_feedback}>
											<p>Натисніть на кнопку, щоб зв’язатись з нами</p>
											<button type="button">Звернутись до нас</button>
										</div>
									</div>
									<div className={styles.dashboard_tab}>{children}</div>
								</div>
							</Layout>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	)
}

export default DashboardLayout
