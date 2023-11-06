import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./Send.module.scss"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import Button from "@/components/util/Button/Button"
import Field from "@/components/util/Field/Field"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/context/UserContext"

export const getFloatNumber = (value: string): string =>
	value.replace(/\D/g, "")

const schema = yup.object().shape({
	phoneNumber: yup
		.string()
		.required()
		.test(
			"is-phone",
			"Телефон має містити 12 цифр",
			(val: string | null | undefined) => {
				if (!val) return false
				return val.replace(/\D/g, "").length === 12
			}
		),
})

type Props = {
	setVerified: Dispatch<SetStateAction<boolean>>
}

type Inputs = {
	phoneNumber: string
}

const Send = ({ setVerified }: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			phoneNumber: "380",
		},
		resolver: yupResolver(schema),
		mode: "onChange",
	})

	const { onChangeIat } = useAuth()
	const { phoneNumber } = useUser()
	const [attempts, setAttempts] = useState(3)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const onSubmit: SubmitHandler<Inputs> = ({ phoneNumber }) => {
		axiosInstance
			.post(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.SEND_OTP}/`,
				{
					phoneNumber: getFloatNumber(phoneNumber),
				}
			)
			.then(response => {
				const { iat, max_otp_try } = response.data
				onChangeIat(iat)
				setVerified(true)
				setAttempts(max_otp_try)
				localStorage.setItem("newPhone", phoneNumber)
			})
			.catch(error => {
				const { message } = error.response.data
				setAttempts(0)
				setErrorMessage(message)
			})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.form__label}>
				<label htmlFor="phone-number">Введіть новий номер телефону:</label>
			</div>
			<div className={styles.form__control}>
				<Controller
					name={"phoneNumber"}
					control={control}
					render={({
						field: { onChange, name, value },
						fieldState: { invalid, error },
					}) => {
						const [disabled, setDisabled] = useState(true)

						useEffect(() => {
							if (phoneNumber === `+${getFloatNumber(value)}`) {
								setDisabled(true)
								setErrorMessage("Номер не повинен співпадати зі старим")
							} else setDisabled(invalid)
						}, [value, invalid])

						useEffect(() => {
							setDisabled(true)
						}, [])

						return (
							<>
								<PatternFormat
									id="phone-number"
									format={"+### (##) ### ## ##"}
									name={name}
									value={value}
									onChange={onChange}
									mask={"_"}
									isAllowed={values => {
										const { floatValue } = values
										if (floatValue?.toString())
											return (
												floatValue.toString().length >= 3 &&
												floatValue.toString().startsWith("380")
											)
										return false
									}}
									customInput={Field}
								/>
								<div className={styles.form__control_button}>
									<Button
										type={"submit"}
										disabled={disabled || attempts === 0}
										toolTip={error?.message || errorMessage || ""}>
										Відправити код
									</Button>
								</div>
							</>
						)
					}}
				/>
			</div>
		</form>
	)
}

export default Send
