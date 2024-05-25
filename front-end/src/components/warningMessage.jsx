import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'


export default function WarningMessage({ open, setOpen, className, children }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false)
        }, 2000);

        return () => clearTimeout(timer);
    }, [open])


    return (
        
        <p className={`${className} flex text-center cursor-default flex-row items-center justify-center w-full text-red-800 transition-opacity duration-200 ease-out delay-75 pointer-events-none ${open ? 'opacity-100' : 'opacity-0'}`}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#940000", }} />
            <span>&nbsp;</span>
            <span className="ml-2 break-words">{children}</span>
        </p>
    )
}