import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./Timer.module.scss"
import { format, addSeconds } from "date-fns"
import TimerIcon from "@/assets/timer.svg"

type Props = {
	time: number
	onChange: Dispatch<SetStateAction<number>>
}

const Timer = ({ time, onChange }: Props) => {
	const [duration, setDuration] = useState(0)

	useEffect(() => {
		if (duration > 0) {
			let timerId: NodeJS.Timeout
			timerId = setInterval(() => {
				setDuration(duration - 1)
			}, 1000)

			return () => clearInterval(timerId)
		}
	}, [duration])

	useEffect(() => {
		onChange(duration)
	}, [duration])

	useEffect(() => {
		const seconds =
			(new Date(time * 1000).getTime() - new Date().getTime()) / 1000
		setDuration(seconds)
	}, [time])

	const formattedTime = (seconds: number) => {
		const helperDate = addSeconds(new Date(0), seconds)
		return format(helperDate, "mm:ss")
	}

	return (
		<div className={styles.timer}>
			<span>{formattedTime(duration)}</span>
			<TimerIcon />
		</div>
	)
}

export default Timer
