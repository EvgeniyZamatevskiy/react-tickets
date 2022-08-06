import React, { FC } from 'react'
import { CurrencyEnum } from 'enums'
import style from './CurrencyValue.module.scss'

type CurrencyValuePropsType = {
	currency: CurrencyEnum
	currentCurrency: CurrencyEnum
	handleSetCurrencyClick: (currency: CurrencyEnum) => void
}

export const CurrencyValue: FC<CurrencyValuePropsType> = ({ handleSetCurrencyClick, currency, currentCurrency }) => {

	const onSetCurrencyClick = (): void => handleSetCurrencyClick(currency)

	return (
		<button
			className={`${style.currency} ${currentCurrency === currency && style.active}`}
			onClick={onSetCurrencyClick}>
			{currency}
		</button>
	)
}
