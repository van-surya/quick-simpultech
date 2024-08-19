import clsx from "clsx"

export const Modal = ({ children, className }) => {

    return (
        <div className={clsx('mb-4 w-[580px] h-[580px] 3xl:w-[640px] 3xl:h-[640px] bg-[#FFF] rounded-md', className)}>
            {children}
        </div>
    )
}
