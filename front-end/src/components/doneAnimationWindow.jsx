
import { useEffect } from 'react'
import DoneGif from '../assets/gif/cuaderno.gif'
import GenericModalTemplate from '../components/genericModalTemplate'


export default function DoneAnimation({ open, setOpen, message }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [open]);

    return (
        <GenericModalTemplate open={open} setOpen={setOpen}>
            <div className="flex flex-row font-semibold text-cyan-950 items-center m-2">
                <img className='w-12' src={DoneGif} alt="Loading" />
                {message}
            </div>
            
        </GenericModalTemplate>
    );
}