import React, { ChangeEvent, FC } from 'react'
import { UniversalCheckbox } from 'components/common'
import { CurrencyValue } from 'components/currencyValue'
import { CurrencyEnum } from 'enums'
import { StopType } from 'types'
import style from './TicketsFilter.module.scss'

type TicketsFilterPropsType = {
	handleSetCurrencyClick: (currency: CurrencyEnum) => void
	onSetStopClick: (event: ChangeEvent<HTMLInputElement>) => void
	currentCurrency: CurrencyEnum
	stops: StopType
}

const currencyValues: CurrencyEnum[] = [CurrencyEnum.RUB, CurrencyEnum.USD, CurrencyEnum.EUR]

export const TicketsFilter: FC<TicketsFilterPropsType> = ({ handleSetCurrencyClick, onSetStopClick, currentCurrency, stops }) => {

	const stopsData = [
		{ id: 'allStops', value: 'Все', checked: stops.allStops },
		{ id: 'noStops', value: 'Без пересадок', checked: stops.noStops },
		{ id: 'oneStop', value: '1 пересадка', checked: stops.oneStop },
		{ id: 'twoStop', value: '2 пересадки', checked: stops.twoStop },
		{ id: 'threeStop', value: '3 пересадки', checked: stops.threeStop },
	]

	const renderCurrencyValues = currencyValues.map((currency, index) => {
		return (
			<CurrencyValue
				key={index}
				currency={currency}
				currentCurrency={currentCurrency}
				handleSetCurrencyClick={handleSetCurrencyClick}
			/>
		)
	})

	const renderStopsData = stopsData.map(({ id, value, checked }) => {
		return (
			<UniversalCheckbox
				key={id}
				id={id}
				checked={checked}
				onChange={onSetStopClick}
			>
				{value}
			</UniversalCheckbox>
		)
	})

	return (
		<div className={style.container}>
			<div className={style.title}>Валюта</div>
			<div className={style.currencyContainer}>
				{renderCurrencyValues}
			</div>
			<div className={style.subtitle}>Количество пересадок</div>
			<div className={style.stops}>
				{renderStopsData}
			</div>
		</div>
	)
}
