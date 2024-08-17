import clsx from "clsx"

export const Modal = ({ children, className }) => {

    return (
        <div className={clsx('mb-4 w-[600px] h-[600px] bg-[#FFF] rounded-md', className)}>
            {children}
        </div>
    )
}
