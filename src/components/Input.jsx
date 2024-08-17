import clsx from 'clsx'

export const Input = ({
    className,
    placeholder,
    type = 'text',
    name,
    value,
    maxLength,
    icon,
    iconClassName,
    isDisabled,
    inputClassName,
    onChange,
}) => {
    const handleOnChange = (e) => {
        const { name, value } = e.target
        onChange({ name: name, value: value })
    }

    const handleOnKeyDown = (e) => {
        if (
            e.target.value.length >= e.target.maxLength &&
            e.key !== 'Backspace' &&
            type === 'number'
        ) {
            e.preventDefault()
        }
    }

    return (
        <div className={clsx('w-full h-11 flex flex-row items-center', className)}>
            <img className={iconClassName} src={icon} alt={icon} />
            <input type="text" className={clsx('border-transparent w-full focus:outline-none focus:ring-none ring-none', inputClassName)}
                disabled={isDisabled}
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={handleOnChange}
                autoComplete='off'
                onKeyDown={handleOnKeyDown}
            />
        </div>
    )
}
