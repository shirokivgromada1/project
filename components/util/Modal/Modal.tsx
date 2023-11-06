import styles from "./Modal.module.scss"
import CloseIcon from "./../../../assets/close.svg"
import { useEffect } from "react"

type Props = {
	onClose: () => void
	isView: boolean
	children: React.ReactNode
}

const Modal = ({ onClose, isView, children }: Props) => {
	useEffect(() => {
		if (isView) document.body.classList.add("overflow-y-hidden")
		return () => {
			document.body.classList.remove("overflow-y-hidden")
		}
	}, [isView])

	if (!isView) return

	return (
		<div className={styles.modal}>
			<div className={styles.wrapper}>
				<div className={styles.modal__exit}>
					<button
						type="button"
						className={styles.modal__exit_button}
						onClick={onClose}>
						<CloseIcon />
					</button>
				</div>
				<div className={styles.modal__message}>{children}</div>
				<div className={styles.modal__close}>
					<button
						type="button"
						className={styles.modal__close_button}
						onClick={onClose}>
						Продовжити
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
