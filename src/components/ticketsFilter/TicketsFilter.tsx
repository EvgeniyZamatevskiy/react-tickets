import { SortPriceType } from 'App'
import { UniversalCheckbox } from 'components/common'
import React, { FC } from 'react'
import style from './TicketsFilter.module.scss'

type TicketsFilterPropsType = {
	handleSortPriceClick: (priceValue: SortPriceType) => void
	sortPrice: SortPriceType
}

const priceValues: SortPriceType[] = ['rub', 'usd', 'eur']

export const TicketsFilter: FC<TicketsFilterPropsType> = ({ handleSortPriceClick, sortPrice }) => {



	const renderPriceValues = priceValues.map((value, index) => {

		const onSortPriceClick = (): void => {
			handleSortPriceClick(value)
		}

		return (
			<button key={index} className={`${style.rubBtn} ${sortPrice === value && style.active}`} onClick={onSortPriceClick}>{value}</button>
		)
	})

	return (
		<div className={style.container}>
			<div className={style.title}>Валюта</div>
			<div className={style.currency}>
				{renderPriceValues}
				{/* <button className={`${style.rubBtn} ${sortPrice === 'rub' && style.active}`} onClick={onSortPriceRubClick}>RUB</button>
				<button className={style.usdBtn} onClick={onSortPriceUsdClick}>USD</button>
				<button className={style.eurBtn} onClick={onSortPriceEurClick}>EUR</button> */}
			</div>
			<div className={style.subtitle}>Количество пересадок</div>
			<div className={style.transplants}>
				<UniversalCheckbox>Все</UniversalCheckbox>
				<UniversalCheckbox>Без пересадок</UniversalCheckbox>
				<UniversalCheckbox>1 пересадка</UniversalCheckbox>
				<UniversalCheckbox>2 пересадки</UniversalCheckbox>
				<UniversalCheckbox>3 пересадки</UniversalCheckbox>
			</div>
		</div>
	)
}
