import React, { FC } from 'react'
import airplane from 'assets/icons/airplane.svg'
import style from './TicketStops.module.scss'

type TicketStopsPropsType = {
	stops: number
}

export const TicketStops: FC<TicketStopsPropsType> = ({ stops }) => {
	return (
		<div className={style.container}>
			{stops}
			{stops === 0 && ' пересадок'}
			{stops === 1 && ' пересадка'}
			{(stops === 2 || stops === 3) && ' пересадки'}
			<div className={style.line}></div>
			<img className={style.airplaneIcon} src={airplane} alt='airplane' />
		</div>
	)
}
