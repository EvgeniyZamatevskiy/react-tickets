import React, { FC } from 'react'
import { CurrencyEnum } from 'enums'
import logo from 'assets/images/logo.png'
import style from './TicketBuy.module.scss'

type TicketBuyPropsType = {
	price: number
	currentCurrency: CurrencyEnum
}

export const TicketBuy: FC<TicketBuyPropsType> = ({ price, currentCurrency }) => {
	return (
		<div className={style.container}>
			<img className={style.logo} src={logo} alt='logo' />
			<button className={style.priceBtn}>
				Купить
				<div>за {price}
					{currentCurrency === CurrencyEnum.RUB && ' ₽'}
					{currentCurrency === CurrencyEnum.USD && ' $'}
					{currentCurrency === CurrencyEnum.EUR && ' €'}
				</div>
			</button>
		</div>
	)
}
