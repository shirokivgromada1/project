import Field from "@/components/util/Field/Field"
import styles from "./ReadOnly.module.scss"
import { useUser } from "@/context/UserContext"
import { usePatternFormat } from "react-number-format"
import Button from "@/components/util/Button/Button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"

type Props = {
	setUpdate: Dispatch<SetStateAction<boolean>>
}

const ReadOnly = ({ setUpdate }: Props) => {
	const { phoneNumber } = useUser()
	const { format } = usePatternFormat({ format: "#### (##) ### ## ##" })
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	useEffect(() => {
		axiosInstance
			.get(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.CAN_PHONE_UPDATE}/`
			)
			.catch(error => {
				const { message } = error.response.data
				setErrorMessage(message)
			})
	}, [])

	return (
		<div className={styles.readOnly}>
			<Field
				type="tel"
				id="readOnly-phone"
				label="Ваш номер телефону: "
				readOnly={true}
				defaultValue={format ? format(phoneNumber) : phoneNumber}
			/>
			<Button
				type="button"
				onClick={() => setUpdate(true)}
				disabled={!!errorMessage}
				toolTip={errorMessage || ""}>
				Змінити
			</Button>
		</div>
	)
}

export default ReadOnly
