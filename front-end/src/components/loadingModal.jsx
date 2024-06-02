import GenericModalTemplate from '../components/genericModalTemplate'
import Loading from '../styledComponents/loading'
import { useState, useEffect } from 'react'

export default function LoadingModal({ text, loading }) {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log(loading);
        loading ? setOpen(true) : setOpen(false)
    }, [loading])

    return (
        <GenericModalTemplate open={open} setOpen={setOpen} zIndex={'z-40'}>
            <Loading />
            <p className='font-semibold mt-2'>{text}</p>
        </GenericModalTemplate>
    )
}