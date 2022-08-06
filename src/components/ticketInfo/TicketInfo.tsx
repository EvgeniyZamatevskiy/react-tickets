import React, { FC } from 'react'
import style from './TicketInfo.module.scss'

type TicketInfoPropsType = {
	time: string
	flight: string
	flightValue: string
	date: string
	className: string
}

export const TicketInfo: FC<TicketInfoPropsType> = ({ time, flight, flightValue, date, className }) => {
	return (
		<div className={className}>
			<div className={style.time}>{time}</div>
			<div className={style.flight}>{flight},<span> {flightValue}</span></div>
			<div className={style.date}>{date}</div>
		</div>
	)
}
