import { Ticket } from 'components/ticket/Ticket'
import React, { FC } from 'react'
import { TicketType } from 'types'
import style from './Tickets.module.scss'

type TicketsPropsType = {
	tickets: TicketType[]
}

export const Tickets: FC<TicketsPropsType> = ({ tickets }) => {

	const renderTickets = tickets.map((ticket, index) => <Ticket key={index} ticket={ticket} />)

	return (
		<div className={style.container}>
			{renderTickets}
		</div>
	)
}
