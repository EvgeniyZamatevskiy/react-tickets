import { UniversalCheckbox } from 'components/common'
import { CurrencyItem } from 'components/currencyItem'
import { CurrencyValue } from 'enums'
import React, { ChangeEvent, FC } from 'react'
import style from './TicketsFilter.module.scss'

type TicketsFilterPropsType = {
	handleSetCurrencyClick: (priceValue: CurrencyValue) => void
	currentCurrency: CurrencyValue
}

const currencyValues: CurrencyValue[] = [CurrencyValue.RUB, CurrencyValue.USD, CurrencyValue.EUR]

export const TicketsFilter: FC<TicketsFilterPropsType> =
	({ handleSetCurrencyClick, currentCurrency }) => {

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

		const onOneTransferClick = (event: ChangeEvent<HTMLInputElement>): void => {
			//setIsOneTransfer(event.currentTarget.checked)
		}

		const onTwoTransferClick = (event: ChangeEvent<HTMLInputElement>): void => {
			//setIsTwoTransfer(event.currentTarget.checked)
		}

		return (
			<div className={style.container}>
				<div className={style.title}>Валюта</div>
				<div className={style.currencyContainer}>
					{renderCurrencyValues}
				</div>
				<div className={style.subtitle}>Количество пересадок</div>
				<div className={style.transplants}>
					<UniversalCheckbox>Все</UniversalCheckbox>
					<UniversalCheckbox>Без пересадок</UniversalCheckbox>
					<UniversalCheckbox onChange={onOneTransferClick}>1 пересадка</UniversalCheckbox>
					<UniversalCheckbox onChange={onTwoTransferClick}>2 пересадки</UniversalCheckbox>
					<UniversalCheckbox>3 пересадки</UniversalCheckbox>
				</div>
			</div>
		)
	}
