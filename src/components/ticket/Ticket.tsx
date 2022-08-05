import React, { FC } from 'react'
import style from './Ticket.module.scss'
import { TicketBuy } from 'components/ticketBuy'
import { TicketInfo } from 'components/ticketInfo'
import { TicketStops } from 'components/ticketStops'
import { TicketType } from 'types'

type TicketPropsType = {
	ticket: TicketType
}

export const Ticket: FC<TicketPropsType> = ({ ticket }) => {
	return (
		<div className={style.container}>
			<div className={style.content}>
				<TicketBuy price={ticket.price} />
				<div className={style.transplants}>
					<TicketInfo
						time={ticket.departure_time}
						flight={ticket.origin}
						flightValue={ticket.origin_name}
						date={ticket.departure_date}
						className={style.departure}
					/>
					<TicketStops stops={ticket.stops} />
					<TicketInfo
						time={ticket.arrival_time}
						flight={ticket.destination_name}
						flightValue={ticket.destination}
						date={ticket.arrival_date}
						className={style.arrival}
					/>
				</div>
			</div>
		</div>
	)
}
