
import {useEffect, useState} from 'react'


export default function useTimeOut({condition=true}) {

    const [show, setShow] = useState(false)


    useEffect(()=>{
        if(condition){
            setTimeout(()=>{
                setShow(true)
            }, 1500)
        }
    },[])


    return show
}