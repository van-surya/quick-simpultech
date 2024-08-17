import clsx from 'clsx'

export const Button = ({
    className,
    iconClassName,
    label,
    icon,
    disabled,
    iconRight,
    iconLeft,
    onClick = () => { },
    type,
}) => {
    const handleOnClick = (e) => {
        if (disabled) return
        e?.stopPropagation()
    }

    return (
        <button
            className={clsx(
                'flex items-center justify-center  transition duration-150 ease-in-out cursor-pointer',
                className,
                disabled ? 'disabled' : ''
            )}
            onClick={(e) => {
                handleOnClick(e)
                onClick()
            }}
            type={type}
            disabled={disabled}
        >
            <>
                {iconRight && <div />}
                {icon && (
                    <img
                        className={clsx(`w-6 h-6 ${label ? 'mr-2' : ''}`, iconClassName)}
                        src={icon}
                        alt=''
                    />
                )}
                {iconLeft && (
                    <img
                        className={clsx(`w-6 h-6 ${label ? 'ml-2' : ''}`, iconClassName)}
                        src={iconLeft}
                        alt=''
                    />
                )}
                {label}
                {iconRight && (
                    <img
                        className={clsx(`w-6 h-6 ${label ? 'ml-2' : ''}`, iconClassName)}
                        src={iconRight}
                        alt=''
                    />
                )}
                {icon && <div />}
            </>
        </button>
    )
}
