import { components } from "react-select"
import styles from "./CustomOption.module.scss"
import { status } from "@/components/authentication/sign-up/Status/Status"

const CustomOption = ({
	children,
	data,
	...props
}: {
	children: any
	data: status
}) => {
	return (
		<components.Option {...(props as any)}>
			<div className={styles.option}>
				<p>{children}</p>
			</div>
		</components.Option>
	)
}

export default CustomOption
