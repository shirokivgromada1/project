import { components } from "react-select"
import styles from "./CustomOption.module.scss"
import { locality } from "../../Locality"

const CustomOption = ({
	children,
	data,
	...props
}: {
	children: any
	data: locality
}) => {
	return (
		<components.Option {...(props as any)}>
			<div className={styles.option}>
				{data.district && <b>{data.district}:</b>}
				<p>{children}</p>
			</div>
		</components.Option>
	)
}

export default CustomOption
