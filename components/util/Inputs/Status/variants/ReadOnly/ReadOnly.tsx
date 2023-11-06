import { Dispatch, SetStateAction } from "react"
import styles from "./ReadOnly.module.scss"
import Field from "../../../../Field/Field"
import Button from "@/components/util/Button/Button"
import { useUser } from "@/context/UserContext"

type Props = {
	setUpdate: Dispatch<SetStateAction<boolean>>
}

const ReadOnly = ({ setUpdate }: Props) => {
	const { status } = useUser()

	const handleClick = () => {
		setUpdate(true)
	}

	return (
		<div className={styles.readOnly}>
			<Field
				type={"text"}
				id="readOnly-status"
				label="Ваш статус:"
				readOnly={true}
				value={status}
				content="Тут відображається ваш статус, який ви вказали під час реєстрації, якщо щось змінилося – змінити це">
				<Button type={"button"} onClick={handleClick}>
					Змінити
				</Button>
			</Field>
		</div>
	)
}

export default ReadOnly
