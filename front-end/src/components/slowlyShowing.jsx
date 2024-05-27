import {useEffect, useState} from 'react'


export default function SlowlyShowing({condition=true, time=2000, children}) {

    const [show, setShow] = useState(false)

    useEffect(()=>{
        if(condition){
            const timer = setTimeout(()=>{
                setShow(true)
            }, time)
            return () => clearTimeout(timer);
        }
    },[])


    return (
        <div className={`transition-opacity duration-600 ${show ? 'opacity-100': 'opacity-0'}`}>
            {children}
        </div>
    )

}