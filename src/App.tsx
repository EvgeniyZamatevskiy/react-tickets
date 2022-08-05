import React, { FC, useEffect, useState } from 'react'
import { Tickets, TicketsFilter } from 'components'
import { TICKETS } from 'api'
import { TicketType } from 'types'

export type SortPriceType = 'rub' | 'usd' | 'eur'

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
  const [sortPrice, setSortPrice] = useState<SortPriceType>('rub')

  useEffect(() => {
    TICKETS.getTickets()
      .then(({ data }) => {
        if (sortPrice === 'rub') {
          setTickets([...data.tickets].sort((a, b) => a.price - b.price))
        }
      })
  }, [])

  const handleSortPriceClick = (priceValue: SortPriceType): void => {
    //setTickets([...tickets].sort((a, b) => a.price - b.price))
    setSortPrice(priceValue)
  }

  return (
    <div className='container'>
      <div className='content'>
        <TicketsFilter handleSortPriceClick={handleSortPriceClick} sortPrice={sortPrice} />
        <Tickets tickets={tickets} />
      </div>
    </div>
  )
}
