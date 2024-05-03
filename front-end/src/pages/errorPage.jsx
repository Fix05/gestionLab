import {useNavigate } from 'react-router-dom'


export default function ErrorPage() {

    const navigate = useNavigate()
    

    const handleClick = () => {
        navigate(-2);
     }

    return (

        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-red-500">404</h1>
                <p className="text-2xl mt-3 font-bold tracking-tight text-gray-500 sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-gray-500">No podemos encontrar esa pagina</p>
                <button
                    onClick={handleClick}
                    className="mt-6 inline-block rounded bg-gray-600 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                    Volver
                </button>
            </div>
        </div>

    )
}