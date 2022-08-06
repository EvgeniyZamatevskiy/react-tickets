import React, { FC, useEffect, useState } from 'react'
import { Tickets, TicketsFilter } from 'components'
import { TICKETS } from 'api'
import { TicketType } from 'types'
import { CurrencyValue } from 'enums'

const DOLLAR_EXCHANGE_RATE = 60.53 // 05.08.2022
const EURO_EXCHANGE_RATE = 61.56 // 05.08.2022

export const App: FC = () => {

  const [tickets, setTickets] = useState<TicketType[]>([])
  {/* {ticket.departure_date} дата отъезда 12.05.18 */ }
  {/* {ticket.departure_time} время отъезда 22:10 */ }
  {/* {ticket.arrival_date} дата прибытия 12.05.18 */ }
  {/* {ticket.arrival_time} время прибытия 16:20 */ }
  {/* {ticket.carrier} перевозчик TK */ }
  {/* {ticket.destination} назначения TLV */ }
  {/* {ticket.destination_name} имя назначения Тель-Авив */ }
  {/* {ticket.origin} источник VVO */ }
  {/* {ticket.origin_name} имя источника Владивосток */ }
  {/* {ticket.price} цена 12400 */ }
  {/* {ticket.stops} пересадок 3 */ }
  const [currency, setCurrency] = useState<CurrencyValue>(CurrencyValue.RUB)

  useEffect(() => {
    TICKETS.getTickets()
      .then(({ data }) => {
        const ticketsCopy = [...data.tickets]

        if (currency === CurrencyValue.RUB) {
          const ticketsSorted = ticketsCopy.sort((a, b) => a.price - b.price)
          setTickets(ticketsSorted)
        }

        if (currency === CurrencyValue.USD) {
          const ticketsCalcPrice = ticketsCopy.map(ticket => {
            const calcSum = ticket.price / DOLLAR_EXCHANGE_RATE
            return { ...ticket, price: Number(calcSum.toFixed(2)) }
          })
          const ticketsSorted = ticketsCalcPrice.sort((a, b) => a.price - b.price)
          setTickets(ticketsSorted)
        }

        if (currency === CurrencyValue.EUR) {
          const ticketsCalcPrice = ticketsCopy.map(ticket => {
            const calcSum = ticket.price / EURO_EXCHANGE_RATE
            return { ...ticket, price: Number(calcSum.toFixed(2)) }
          })
          const ticketsSorted = ticketsCalcPrice.sort((a, b) => a.price - b.price)
          setTickets(ticketsSorted)
        }

        return
      })
  }, [currency])

  const handleSetCurrencyClick = (currency: CurrencyValue): void => {
    setCurrency(currency)
  }

  return (
    <div className='container'>
      <div className='content'>
        <TicketsFilter
          handleSetCurrencyClick={handleSetCurrencyClick}
          currentCurrency={currency}
        />
        <Tickets tickets={tickets} />
      </div>
    </div>
  )
}
