import { useState } from "react"
import styles from "./Status.module.scss"
import Base from "./variants/Base/Base"
import ReadOnly from "./variants/ReadOnly/ReadOnly"

const Status = () => {
	const [isUpdate, setUpdate] = useState(false)

	return (
		<div className={styles.statusContainer}>
			{isUpdate && <Base setUpdate={setUpdate} />}
			{!isUpdate && <ReadOnly setUpdate={setUpdate} />}
		</div>
	)
}

export default Status
