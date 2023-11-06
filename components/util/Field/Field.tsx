import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react"
import styles from "./Field.module.scss"
import { UseFormRegister, FieldValues, Path } from "react-hook-form"
import VisibilityButton from "../VisibilityButton/VisibilityButton"
import classNames from "classnames"

interface Props<T extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	id?: string
	type: HTMLInputTypeAttribute
	label?: string
	content?: string
	readOnly?: boolean
	placeholder?: string
	register?: UseFormRegister<T>
	registerLabel?: Path<T>
	messageError?: string | undefined
	isError?: boolean
	defaultValue?: string | undefined
	children?: React.ReactNode
}

const Field = <T extends FieldValues>({
	id,
	type,
	label,
	content,
	readOnly = false,
	placeholder = "",
	register,
	registerLabel,
	messageError,
	isError,
	defaultValue,
	children,
	...props
}: Props<T>) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className={styles.field}>
			{label && (
				<div className={styles.field__label}>
					<label htmlFor={id}>{label}</label>
					{content && <p>{content}</p>}
				</div>
			)}
			<div
				className={classNames(styles.field__input, {
					[styles.field__input_error]: isError,
				})}>
				<input
					id={id}
					readOnly={readOnly}
					placeholder={placeholder}
					type={showPassword ? "text" : type}
					autoComplete={"off"}
					defaultValue={defaultValue}
					{...(register && registerLabel ? register(registerLabel) : {})}
					{...props}
				/>
				{type === "password" && (
					<VisibilityButton
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
				)}
				{children}
			</div>
			{isError && <div className={styles.field__error}>{messageError}</div>}
		</div>
	)
}

export default Field
