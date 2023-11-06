import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./Base.module.scss"
import Field from "../../../../Field/Field"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "@/components/util/Button/Button"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS } from "@/constants/endpoints"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Modal from "@/components/util/Modal/Modal"
import Loader from "@/components/util/Loader/Loader"

type Props = {
	setUpdate: Dispatch<SetStateAction<boolean>>
}

const schema = yup
	.object({
		password: yup
			.string()
			.required("Пароль є обов'язковим")
			.min(8, "Пароль має мати мінімум 8 символів")
			.matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "Пароль не відповідає умові"),
		newPassword: yup
			.string()
			.required("Пароль є обов'язковим")
			.min(8, "Пароль має мати мінімум 8 символів")
			.matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "Пароль не відповідає умові")
			.notOneOf([yup.ref("password")], "Паролі не повинні співпадати"),
	})
	.required()

type Inputs = {
	password: string
	newPassword: string
}

const Base = ({ setUpdate }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema), mode: "onChange" })

	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setLoading] = useState(false)

	const onSubmit: SubmitHandler<Inputs> = data => {
		setLoading(true)
		axiosInstance
			.patch(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.PASSWORD_UPDATE}/`,
				{
					...data,
				}
			)
			.then(response => {
				const { message } = response.data
				setMessage(message)
			})
			.catch(error => {
				if (error?.response?.data) {
					const { message } = error.response.data
					setError(message)
				}
				console.log("error", error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleClose = () => {
		setUpdate(false)
		setMessage(null)
	}

	useEffect(() => {
		error && setError(null)
	}, [watch("password")])

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					id="password"
					label="Ваш старый пароль:"
					type="password"
					placeholder="••••••••••"
					register={register}
					registerLabel={"password"}
					isError={!!errors.password?.message || !!error}
					messageError={errors.password?.message || error || ""}
				/>
				<Field
					id="newPassword"
					label="Ваш новий пароль:"
					placeholder="••••••••••"
					type="password"
					register={register}
					registerLabel={"newPassword"}
					isError={!!errors.newPassword?.message}
					messageError={errors.newPassword?.message}
				/>

				<div className={styles.form__button}>
					{!isLoading && <Button type="submit">Підтвердити</Button>}
					{isLoading && <Loader />}
				</div>
			</form>
			<Modal isView={!!message} onClose={handleClose}>
				{message}
			</Modal>
		</>
	)
}

export default Base
