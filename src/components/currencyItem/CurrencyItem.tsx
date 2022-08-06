import { CurrencyValue } from 'enums'
import React, { FC } from 'react'
import style from './CurrencyItem.module.scss'

type CurrencyItemPropsType = {
	currency: CurrencyValue
	currentCurrency: CurrencyValue
	handleSetCurrencyClick: (currency: CurrencyValue) => void
}

export const CurrencyItem: FC<CurrencyItemPropsType> = ({ handleSetCurrencyClick, currency, currentCurrency }) => {

	const onSetCurrencyClick = (): void => handleSetCurrencyClick(currency)

	return (
		<button
			className={`${style.currency} ${currentCurrency === currency && style.active}`}
			onClick={onSetCurrencyClick}>
			{currency}
		</button>
	)
}
