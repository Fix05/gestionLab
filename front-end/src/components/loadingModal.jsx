import GenericModalTemplate from '../components/genericModalTemplate'
import Loading from '../styledComponents/loading'
import {useState, useEffect} from 'react'

export default function LoadingModal({text, laoding}) {

    const [open, setOpen] = useState(false)

    useEffect(()=>{
        console.log("loading", text, laoding);
        laoding ? setOpen(true): setOpen(false)
    },[laoding])

    return(
        <GenericModalTemplate open={open} setOpen={setOpen}>
            <Loading/>
            <p className='mt-2'>{text}</p>
        </GenericModalTemplate>
    )
}