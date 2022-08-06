import { TicketType } from 'types'

export const getSortedTickets =
	(ticketsCopy: TicketType[], setTickets: (tickets: TicketType[]) => void, currencyValue: number): void => {

		const ticketsCalcPrice = ticketsCopy.map(ticket => {

			const calcSum = ticket.price / currencyValue

			return { ...ticket, price: Number(calcSum.toFixed(2)) }
		})

		const ticketsSorted = ticketsCalcPrice.sort((a, b) => a.price - b.price)

		setTickets(ticketsSorted)
	}
