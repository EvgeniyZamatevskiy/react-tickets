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
			<div className={style.departureTime}>
				{time}
			</div>
			<div className={style.origin}>
				{flight},
				<span>
					{flightValue}
				</span>
			</div>
			<div className={style.departureDate}>
				{date}
			</div>
		</div>
	)
}
