
import {useEffect} from 'react'
import DoneGif from '../assets/gif/cuaderno.gif'


export default function DoneAnimation({ open, setOpen }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div className={`bg-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 ${open ? 'block': 'auto'}`}>
            <img className='w-28' src={DoneGif} alt="Loading" />
        </div>
    );
}