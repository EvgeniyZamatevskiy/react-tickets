import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Tickets, TicketsFilter } from 'components'
import { TICKETS } from 'api'
import { StopType, TicketType } from 'types'
import { CurrencyEnum } from 'enums'
import { getSortedTickets } from 'utils'

export const DOLLAR_EXCHANGE_RATE = 60.53 // 05.08.2022
export const EURO_EXCHANGE_RATE = 61.56 // 05.08.2022

export const App: FC = () => {

  const [tickets, setTickets] = useState<TicketType[]>([])
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.RUB)
  const [stops, setStops] = useState<StopType>({
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

        if (currency === CurrencyEnum.RUB) {
          const ticketsSorted = ticketsCopy.sort((a, b) => a.price - b.price)
          setTickets(ticketsSorted)
        }

        if (currency === CurrencyEnum.USD) {
          getSortedTickets(ticketsCopy, setTickets, DOLLAR_EXCHANGE_RATE)
        }

        if (currency === CurrencyEnum.EUR) {
          getSortedTickets(ticketsCopy, setTickets, EURO_EXCHANGE_RATE)
        }

        return
      })
  }, [currency])

  const handleSetCurrencyClick = (currency: CurrencyEnum): void => setCurrency(currency)

  const handleSetStopClick = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentStop = event.currentTarget.id
    let updatedStops

    const stopsUpdate = (currentStop: string) => {
      if (currentStop === 'allStops' && stops.allStops === false) {
        return { ...stops, allStops: true, noStops: true, oneStop: true, twoStop: true, threeStop: true }
      }

      const stopsStatus: any = {
        noStops: { ...stops, noStops: !stops.noStops, allStops: false },
        oneStop: { ...stops, oneStop: !stops.oneStop, allStops: false },
        twoStop: { ...stops, twoStop: !stops.twoStop, allStops: false },
        threeStop: { ...stops, threeStop: !stops.threeStop, allStops: false },
        allStops: { ...stops, allStops: false, noStops: true, oneStop: false, twoStop: false, threeStop: false }
      }

      for (let key in stopsStatus) {
        if (key === currentStop) {
          return stopsStatus[key]
        }
      }
    }

    updatedStops = stopsUpdate(currentStop)

    if (updatedStops.allStops === false
      && updatedStops.noStops === true
      && updatedStops.oneStop === true
      && updatedStops.twoStop === true
      && updatedStops.threeStop === true) {
      updatedStops = { ...stops, allStops: true, noStops: true, oneStop: true, twoStop: true, threeStop: true }
    }

    setStops(updatedStops)
  }

  const stopFilter = () => {
    let arrayForFilter = [] as any

    const stopState: any = stops

    for (let key in stopState) {
      if (stopState[key] === true) {
        arrayForFilter = [...arrayForFilter, key]
      }
    }

    const stopsCount = { noStops: 0, oneStop: 1, twoStop: 2, threeStop: 3 }

    //@ts-ignore
    arrayForFilter = arrayForFilter.map(item => stopsCount[item])
    return arrayForFilter
  }

  let filteredTickets = tickets
  const checkArr = stopFilter()
  filteredTickets = filteredTickets.filter(ticket => checkArr.indexOf(ticket.stops) !== -1)

  return (
    <div className='container'>
      <div className='content'>
        <TicketsFilter
          handleSetCurrencyClick={handleSetCurrencyClick}
          onSetStopClick={handleSetStopClick}
          currentCurrency={currency}
          stops={stops}
        />
        <Tickets tickets={filteredTickets} currentCurrency={currency} />
      </div>
    </div>
  )
}
