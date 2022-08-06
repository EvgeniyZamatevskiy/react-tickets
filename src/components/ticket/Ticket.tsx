import React, { FC } from 'react'
import { TicketType } from 'types'
import { CurrencyEnum } from 'enums'
import { TicketBuy } from 'components/ticketBuy'
import { TicketInfo } from 'components/ticketInfo'
import { TicketStops } from 'components/ticketStops'
import style from './Ticket.module.scss'

type TicketPropsType = {
	ticket: TicketType
	currentCurrency: CurrencyEnum
}

export const Ticket: FC<TicketPropsType> = ({ ticket, currentCurrency }) => {

	const {
		price,
		departure_time,
		origin,
		origin_name,
		departure_date,
		stops, arrival_time,
		destination_name,
		destination,
		arrival_date
	} = ticket

	return (
		<div className={style.container}>
			<div className={style.content}>
				<TicketBuy price={price} currentCurrency={currentCurrency} />
				<div className={style.info}>
					<TicketInfo
						time={departure_time}
						flight={origin}
						flightValue={origin_name}
						date={departure_date}
						className={style.departure}
					/>
					<TicketStops stops={stops} />
					<TicketInfo
						time={arrival_time}
						flight={destination_name}
						flightValue={destination}
						date={arrival_date}
						className={style.arrival}
					/>
				</div>
			</div>
		</div>
	)
}
