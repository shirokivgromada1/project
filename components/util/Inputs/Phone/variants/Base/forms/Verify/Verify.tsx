import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styles from "./Verify.module.scss"
import Field from "@/components/util/Field/Field"
import Button from "@/components/util/Button/Button"
import Timer from "@/components/util/Timer/Timer"
import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import Modal from "@/components/util/Modal/Modal"
import Loader from "@/components/util/Loader/Loader"
import { useUser } from "@/context/UserContext"
import { getFloatNumber } from "../Send/Send"

const schema = yup.object().shape({
	code: yup
		.string()
		.required("Код є обов'язковим")
		.length(6, "Код має мати 6 символів"),
})

type Props = {
	setVerified: Dispatch<SetStateAction<boolean>>
	setUpdate: Dispatch<SetStateAction<boolean>>
}

type Inputs = {
	code: string
}

const Verify = ({ setVerified, setUpdate }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		mode: "onChange",
	})

	const { onChangePhoneNumber } = useUser()
	const { iat } = useAuth()
	const [error, setError] = useState("")
	const [time, setTime] = useState(0)
	const [isLoading, setLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)

	const onSubmit: SubmitHandler<Inputs> = data => {
		setLoading(true)
		axiosInstance
			.patch(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.PHONE_UPDATE}/`,
				{
					phoneNumber: localStorage.getItem("newPhone"),
					otp: data.code,
				}
			)
			.then(response => {
				const { message } = response.data
				setMessage(message)
				onChangePhoneNumber(
					`+${getFloatNumber(localStorage.getItem("newPhone") as string)}`
				)
				localStorage.removeItem("newPhone")
			})
			.catch(error => {
				if (error?.response?.data) {
					const { message } = error.response.data
					setError(message)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleClose = () => {
		setUpdate(false)
		setVerified(false)
		setMessage(null)
	}

	useEffect(() => {
		if (time < 0) setError("Час минув")
		else setError("")
	}, [time])

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.form__label}>
					<label htmlFor="phone-number">Введіть код підтвердження:</label>
				</div>
				<div className={styles.form__control}>
					<Field
						type="text"
						placeholder="012345"
						id="code"
						register={register}
						registerLabel={"code"}
						maxLength={6}
						isError={!!error}
						messageError={error}>
						<Timer time={iat} onChange={setTime} />
					</Field>
					<div className={styles.form__control_button}>
						{!isLoading && (
							<Button
								type="submit"
								disabled={!!errors.code || !!error}
								toolTip={errors.code?.message || error || ""}>
								Підтвердити
							</Button>
						)}
						{isLoading && <Loader />}
					</div>
				</div>
			</form>
			<Modal isView={!!message} onClose={handleClose}>
				{message}
			</Modal>
		</>
	)
}

export default Verify
