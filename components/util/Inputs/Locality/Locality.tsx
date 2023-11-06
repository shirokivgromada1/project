import { useState } from "react"
import styles from "./Locality.module.scss"
import Base from "./variants/Base/Base"
import ReadOnly from "./variants/ReadOnly/ReadOnly"

const Locality = () => {
	const [isUpdate, setUpdate] = useState(false)

	return (
		<div className={styles.localityContainer}>
			{isUpdate && <Base setUpdate={setUpdate} />}
			{!isUpdate && <ReadOnly setUpdate={setUpdate} />}
		</div>
	)
}

export default Locality
