import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Base.module.scss"
import Button from "@/components/util/Button/Button"
import axiosInstance from "@/interceptors/axios"
import { AUTH_ENDPOINTS, DATA_ENDPOINTS } from "@/constants/endpoints"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Modal from "@/components/util/Modal/Modal"
import Loader from "@/components/util/Loader/Loader"
import Select from "@/components/util/Select/Select"
import axios from "axios"
import { toast } from "react-toastify"
import ReactSelect, { StylesConfig } from "react-select"
import CustomOption from "@/components/authentication/sign-up/Locality/components/CustomOption/CustomOption"
import { useUser } from "@/context/UserContext"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
	.object({
		locality: yup.string().required("Населений пункт є обов'язковим"),
	})
	.required()

type locality = {
	value: string
	label: string
	district: string
}

const _: locality[] = [
	{
		value: "с. Широке",
		label: "с. Широке",
		district: "Адміністративний центр",
	},
	{ value: "с-ще Сонячне", label: "с-ще Сонячне", district: "Сонячний округ" },
	{
		value: "с-ще Відрадне",
		label: "с-ще Відрадне",
		district: "Відраднівський округ",
	},
	{
		value: "с. Августинівка",
		label: "с. Августинівка",
		district: "Августинівський округ",
	},
	{
		value: "с. Лемешинське",
		label: "с. Лемешинське",
		district: "Августинівський округ",
	},
	{
		value: "с. Івангород",
		label: "с. Івангород",
		district: "Августинівський округ",
	},
	{
		value: "с. Привітне",
		label: "с. Привітне",
		district: "Августинівський округ",
	},
	{
		value: "с. Світанок",
		label: "с. Світанок",
		district: "Августинівський округ",
	},
	{
		value: "Новоселище",
		label: "Новоселище",
		district: "Августинівський округ",
	},
]

const stylesSelect: StylesConfig<locality, false> = {
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
	locality: string
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

	const [localityOptions, setLocalityOptions] = useState(_)

	const { onChangeLocality } = useUser()

	useEffect(() => {
		axios
			.get(
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${DATA_ENDPOINTS.LIST_VILLAGES}/`
			)
			.then(response => {
				setLocalityOptions(response.data.villages)

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
				`${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.LOCALITY_UPDATE}/`,
				{
					...data,
				}
			)
			.then(response => {
				const { message } = response.data
				setMessage(message)
				onChangeLocality(data.locality)
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
					name={"locality"}
					control={control}
					render={({
						field: { onChange, name, value },
						fieldState: { invalid, error },
					}) => {
						return (
							<div className={styles.base}>
								<div className={styles.base__label}>
									<label htmlFor="select-locality">
										Ваш населенний пункт:{" "}
									</label>
									<p>
										Тут відображається ваш населений пункт, який ви вказали під
										час реєстрації, якщо ви змінили місце – вкажіть це
									</p>
								</div>
								<div className={styles.base__control}>
									<ReactSelect
										id="select-locality"
										name={name}
										value={localityOptions?.find(c => c.value === value)}
										onChange={val => onChange(val?.value)}
										placeholder="Ваш населений пункт"
										components={{ Option: CustomOption }}
										options={localityOptions || []}
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
