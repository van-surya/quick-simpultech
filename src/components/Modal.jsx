import clsx from "clsx"

export const Modal = ({ children, className }) => {

    return (
        <div className={clsx('mb-4 w-[640px] h-[640px] bg-[#FFF] rounded-md', className)}>
            {children}
        </div>
    )
}
