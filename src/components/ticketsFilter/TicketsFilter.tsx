import { UniversalCheckbox } from 'components/common'
import { CurrencyItem } from 'components/currencyItem'
import { CurrencyValue } from 'enums'
import React, { FC } from 'react'
import style from './TicketsFilter.module.scss'

type TicketsFilterPropsType = {
	handleSetCurrencyClick: (currency: CurrencyValue) => void
	currentCurrency: CurrencyValue
	stops: any
	stopsClick: (event: any) => void
}

const currencyValues: CurrencyValue[] = [CurrencyValue.RUB, CurrencyValue.USD, CurrencyValue.EUR]

const stopsValues = ['allStops', 'noStops', 'oneStop', 'twoStop', 'threeStop']

export const TicketsFilter: FC<TicketsFilterPropsType> =
	({ handleSetCurrencyClick, currentCurrency, stops, stopsClick }) => {

		const renderCurrencyValues = currencyValues.map((currency, index) => {
			return (
				<CurrencyItem
					key={index}
					currency={currency}
					currentCurrency={currentCurrency}
					handleSetCurrencyClick={handleSetCurrencyClick}
				/>
			)
		})

		return (
			<div className={style.container}>
				<div className={style.title}>Валюта</div>
				<div className={style.currencyContainer}>
					{renderCurrencyValues}
				</div>
				<div className={style.subtitle}>Количество пересадок</div>
				<div className={style.transfers}>
					{/* {transfers.map(({ id, name }, index) => {
						return (
							<UniversalCheckbox
								key={id}
								checked={false}
							>
								{name}
							</UniversalCheckbox>
						)
					})} */}
					{/* <UniversalCheckbox>Все</UniversalCheckbox>
					<UniversalCheckbox>Без пересадок</UniversalCheckbox>
					<UniversalCheckbox>1 пересадка</UniversalCheckbox>
					<UniversalCheckbox>2 пересадки</UniversalCheckbox>
					<UniversalCheckbox>3 пересадки</UniversalCheckbox> */}

					<div>
						<input type="checkbox" id="allStops" onChange={stopsClick} checked={stops.allStops} />
						<label htmlFor="allStops">Все</label>
					</div>
					<div>
						<input type="checkbox" id="noStops" onChange={stopsClick} checked={stops.noStops} />
						<label htmlFor="noStops">Без пересадок</label>
					</div>
					<div>
						<input type="checkbox" id="oneStop" onChange={stopsClick} checked={stops.oneStop} />
						<label htmlFor="oneStop" >1 пересадка</label>
					</div>
					<div >
						<input type="checkbox" id="twoStop" onChange={stopsClick} checked={stops.twoStop} />
						<label htmlFor="twoStop">2 пересадка</label>
					</div>
					<div >
						<input type="checkbox" id="threeStop" onChange={stopsClick} checked={stops.threeStop} />
						<label htmlFor="threeStop">3 пересадка</label>
					</div>

				</div>
			</div>
		)
	}
