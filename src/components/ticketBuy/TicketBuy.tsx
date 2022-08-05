import React, { FC } from 'react'
import logo from 'assets/images/logo.png'
import style from './TicketBuy.module.scss'

type TicketBuyPropsType = {
	price: number
}

export const TicketBuy: FC<TicketBuyPropsType> = ({ price }) => {
	return (
		<div className={style.buy}>
			<img className={style.logo} src={logo} alt='logo' />
			<button className={style.priceBtn}>
				Купить
				<div>за {price} ₽</div>
			</button>
		</div>
	)
}
