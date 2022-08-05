import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import style from './UniversalCheckbox.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type UniversalCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  handleCheckboxChange?: (checked: boolean) => void
  spanClassName?: string
}

export const UniversalCheckbox: FC<UniversalCheckboxPropsType> =
  ({ onChange, handleCheckboxChange, className, spanClassName, children, ...props }) => {

    const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(event)
      handleCheckboxChange && handleCheckboxChange(event.currentTarget.checked)
    }

    const finalInputClassName = `${style.checkbox} ${className && className}`

    return (
      <label>
        <input type={'checkbox'} onChange={onCheckboxChange} className={finalInputClassName} {...props} />
        {children && <span className={style.spanClassName}>{children}</span>}
      </label>
    )
  }
