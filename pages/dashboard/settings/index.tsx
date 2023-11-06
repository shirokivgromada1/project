import { GetServerSidePropsContext } from "next"
import styles from "./Settings.module.scss"
import client from "@/tina/__generated__/client"
import DashboardLayout from "@/components/dashboard/layout/layout"
import { AsyncReturnType } from "@/pages/[filename]"
import { useTina } from "tinacms/dist/react"
import Phone from "@/components/util/Inputs/Phone/Phone"
import Password from "@/components/util/Inputs/Password/Password"
import Locality from "@/components/util/Inputs/Locality/Locality"
import Status from "@/components/util/Inputs/Status/Status"
import Viber from "@/components/util/Inputs/Viber/Viber"

import ExitIcon from "@/assets/exit.svg"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/context/UserContext"

const Settings = (
	props: AsyncReturnType<typeof getServerSideProps>["props"]
) => {
	const { data } = useTina(props)
	const { logOut } = useAuth()
	const { clear } = useUser()

	const handleExit = () => {
		axiosInstance
			.post(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}/`,
				{
					refresh_token: localStorage.getItem("refresh_token"),
				},
				{
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
		<DashboardLayout data={data}>
			<div className={styles.settings}>
				<div className={styles.settings_headlines}>
					<h1>Налаштування вашого аккаунту</h1>
					<h5>Ви завжди можете змінити ці пункти</h5>
				</div>
				<div className={styles.settings__info}>
					<div className={styles.settings__info_phone}>
						<Phone />
					</div>
					<div className={styles.settings__info_password}>
						<Password />
					</div>
					<div className={styles.settings__info_locality}>
						<Locality />
					</div>
					<div className={styles.settings__info_status}>
						<Status />
					</div>
					<div className={styles.settings__info_Viber}>
						<Viber />
					</div>
				</div>
				<div className={styles.settings_exit} onClick={handleExit}>
					<button type="button">
						<ExitIcon />
						<span>Вийти з особистого кабінету</span>
					</button>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Settings

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const tinaProps = await client.queries.contentQuery({
		relativePath: `home.md`,
	})
	const props = {
		...tinaProps,
		enableVisualEditing: process.env.VERCEL_ENV === "preview",
	}
	return {
		props: JSON.parse(JSON.stringify(props)) as typeof props,
	}
}
