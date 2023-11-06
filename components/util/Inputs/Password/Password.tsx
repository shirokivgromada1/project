import { useState } from "react"
import styles from "./Password.module.scss"
import Base from "./variants/Base/Base"
import ReadOnly from "./variants/ReadOnly/ReadOnly"

const Password = () => {
	const [isUpdate, setUpdate] = useState(false)

	return (
		<div className={styles.passwordContainer}>
			{isUpdate && <Base setUpdate={setUpdate} />}
			{!isUpdate && <ReadOnly setUpdate={setUpdate} />}
		</div>
	)
}

export default Password
