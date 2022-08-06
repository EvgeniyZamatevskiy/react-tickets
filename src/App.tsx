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
  const [stops, setStops] = useState({
    noStops: true,
    oneStop: false,
    twoStop: false,
    threeStop: false,
    allStops: false
  })

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

  const stopsClick = (event: any) => {
    const theStop = event.target.id
    console.log(event.target.id)

    let newStops

    const stopsStateChange = (theStop: any) => {
      if (theStop === "allStops" && stops.allStops === false) {
        return { ...stops, allStops: true, noStops: true, oneStop: true, twoStop: true, threeStop: true }
      }

      const stopsStatus = {
        noStops: { ...stops, noStops: !stops.noStops, allStops: false },
        oneStop: { ...stops, oneStop: !stops.oneStop, allStops: false },
        twoStop: { ...stops, twoStop: !stops.twoStop, allStops: false },
        threeStop: { ...stops, threeStop: !stops.threeStop, allStops: false },
        allStops: { ...stops, allStops: false, noStops: true, oneStop: false, twoStop: false, threeStop: false }
      }

      for (let key in stopsStatus) {
        if (key === theStop) {
          //@ts-ignore
          return stopsStatus[key]
        }
      }
    }

    newStops = stopsStateChange(theStop)

    if (newStops.allStops === false && newStops.noStops === true && newStops.oneStop === true && newStops.twoStop === true && newStops.threeStop === true) {
      newStops = { ...stops, allStops: true, noStops: true, oneStop: true, twoStop: true, threeStop: true }
    }
    setStops({ ...newStops })
  }

  const stopFilter = (items: any) => {
    let arrayForFilter = [] as any
    const stopState = stops
    for (let key in stopState) {
      //@ts-ignore
      if (stopState[key] === true) {
        arrayForFilter = [...arrayForFilter, key]
      }
    }
    const stopsCount = {
      noStops: 0,
      oneStop: 1,
      twoStop: 2,
      threeStop: 3
    }
    //@ts-ignore
    arrayForFilter = arrayForFilter.map((item: any) => stopsCount[item])
    return arrayForFilter
  }

  let items = tickets
  const checkArr = stopFilter(items)
  items = items.filter(item => checkArr.indexOf(item.stops) !== -1)

  return (
    <div className='container'>
      <div className='content'>
        <TicketsFilter
          handleSetCurrencyClick={handleSetCurrencyClick}
          currentCurrency={currency}
          stops={stops}
          stopsClick={stopsClick}
        />
        <Tickets tickets={items} />
      </div>
    </div>
  )
}
