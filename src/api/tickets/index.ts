import { instance } from 'api/config'
import { TicketType } from 'types'

export const TICKETS = {
	getTickets() {
		return instance.get<{ tickets: TicketType[] }>('tickets.json')
	}
}
