import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Base.module.scss"
import Button from "@/components/util/Button/Button"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS, DATA_ENDPOINTS } from "@/constants/endpoints"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Modal from "@/components/util/Modal/Modal"
import Loader from "@/components/util/Loader/Loader"
import axios from "axios"
import { toast } from "react-toastify"
import ReactSelect, { StylesConfig } from "react-select"
import { useUser } from "@/context/UserContext"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CustomOption from "../../components/CustomOption/CustomOption"

const schema = yup
	.object({
		status: yup.string().required("Статус є обов'язковим"),
	})
	.required()

type status = {
	value: string
	label: string
}

const stylesSelect: StylesConfig<status, false> = {
	menuList: (base: any) => ({
		...base,
		"::-webkit-scrollbar": {
			width: "9px",
		},
		"::-webkit-scrollbar-track": {
			background: "transparent",
		},
		"::-webkit-scrollbar-thumb": {
			background: "#8D8A8A",
			borderRadius: "10px",
		},
		"::-webkit-scrollbar-thumb:hover": {
			background: "#555",
		},
	}),
	option: (styles, { isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: isDisabled ? undefined : isFocused ? "#eee" : undefined,
			" p, b": {
				fontWeight: isSelected ? 600 : 400,
			},
		}
	},
	control: styles => ({
		...styles,
		color: "#000",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "normal",
		textAlign: "center",
	}),
}

type Props = {
	setUpdate: Dispatch<SetStateAction<boolean>>
}

type Inputs = {
	status: string
}

const Base = ({ setUpdate }: Props) => {
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema), mode: "onChange" })

	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [isLoading, setLoading] = useState(false)

	const [statusOptions, setStatusOptions] = useState<status[] | null>(null)

	const { onChangeStatus } = useUser()

	useEffect(() => {
		axios
			.get(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${DATA_ENDPOINTS.LIST_STATUSES}/`
			)
			.then(response => {
				setStatusOptions(response.data.statuses)

				toast.success(response.data.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})
			})
			.catch(error => {
				toast.error(error.data.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})
			})
	}, [])

	const onSubmit: SubmitHandler<Inputs> = data => {
		setLoading(true)
		axiosInstance
			.patch(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.STATUS_UPDATE}/`,
				{
					...data,
				}
			)
			.then(response => {
				const { message } = response.data
				setMessage(message)
				onChangeStatus(data.status)
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
		setMessage(null)
		setUpdate(false)
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Controller
					name="status"
					control={control}
					render={({
						field: { onChange, name, value },
						fieldState: { invalid, error },
					}) => {
						return (
							<div className={styles.base}>
								<div className={styles.base__label}>
									<label htmlFor="select-status">Ваш статус: </label>
									<p>
										Тут відображається ваш статус, який ви вказали під час
										реєстрації, якщо щось змінилося – змінити це
									</p>
								</div>
								<div className={styles.base__control}>
									<ReactSelect
										id="select-status"
										name={name}
										value={
											statusOptions &&
											statusOptions?.find(c => c.value === value)
										}
										onChange={val => onChange(val?.value)}
										placeholder="Ваш населений пункт"
										components={{ Option: CustomOption }}
										options={statusOptions || []}
										className={styles.select}
										theme={theme => ({
											...theme,
											borderRadius: 7,
											colors: {
												...theme.colors,
												primary: "transparent",
											},
										})}
										styles={stylesSelect}
									/>
									<div className={styles.form__control_button}>
										{!isLoading && (
											<Button
												type="submit"
												disabled={invalid}
												toolTip={error?.message}>
												Змінити
											</Button>
										)}
										{isLoading && <Loader />}
									</div>
								</div>
							</div>
						)
					}}
				/>
			</form>
			<Modal isView={!!message} onClose={handleClose}>
				{message}
			</Modal>
		</>
	)
}

export default Base
