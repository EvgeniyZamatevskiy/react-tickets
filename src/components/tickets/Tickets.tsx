import React, { FC } from 'react'
import { Ticket } from 'components/ticket/Ticket'
import { CurrencyEnum } from 'enums'
import { TicketType } from 'types'

type TicketsPropsType = {
	tickets: TicketType[]
	currentCurrency: CurrencyEnum
}

export const Tickets: FC<TicketsPropsType> = ({ tickets, currentCurrency }) => {
	const renderTickets = tickets.map((ticket, index) => <Ticket key={index} ticket={ticket} currentCurrency={currentCurrency} />)

	return <div>{renderTickets}</div>
}
