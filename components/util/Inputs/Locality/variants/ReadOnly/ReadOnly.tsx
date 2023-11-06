import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./ReadOnly.module.scss"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import Field from "../../../../Field/Field"
import Button from "@/components/util/Button/Button"
import { useUser } from "@/context/UserContext"

type Props = {
	setUpdate: Dispatch<SetStateAction<boolean>>
}

const ReadOnly = ({ setUpdate }: Props) => {
	const { locality } = useUser()

	const handleClick = () => {
		setUpdate(true)
	}

	return (
		<div className={styles.readOnly}>
			<Field
				type={"text"}
				id="readOnly-locality"
				label="Ваш населенний пункт: "
				readOnly={true}
				value={locality}
				content="Тут відображається ваш населений пункт, який ви вказали під час реєстрації, якщо ви змінили місце  – вкажіть це">
				<Button type={"button"} onClick={handleClick}>
					Змінити
				</Button>
			</Field>
		</div>
	)
}

export default ReadOnly
