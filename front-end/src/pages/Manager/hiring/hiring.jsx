
import { EmployeeData, Container, Div } from '../../../styledComponents/detailsBox'
import { Link } from 'react-router-dom'
import AILogo from '../../../assets/images/inteligencia-artificial.png'
import AddLogo from '../../../assets/images/prueba-de-turing.png'
import SlowlyShowing from '../../../components/slowlyShowing'


export default function Hiring() {

    return (
        <SlowlyShowing time={100}>
            <div className="mt-6 flex py-[30px] min-h-[300px] flex-row items-center justify-around rounded-lg bg-gray-200 bg-opacity-80 font-bold text-gray-600">
                <Link to={"addEmployee"} className='w-[94%] flex flex-row items-center p-[30px] z-10 mx-[30px] border-2 border-solid border-gray-400 rounded-[10px] bg-gray-50 transition-all hover:bg-gray-200 hover:translate-x-[1px] hover:translate-y-[1px]'>
                    <p className='text-left'>Añadir nuevos empleados al sistema</p>
                    <img className='w-[35%]' src={AddLogo} alt="" />
                </Link>
                <Link to={"recomendCandidate"} className='w-[94%] flex flex-row items-center p-[30px] z-10 mx-[30px] border-2 border-solid border-gray-400 rounded-[10px] bg-gray-50 transition-all hover:bg-gray-200 hover:translate-x-[1px] hover:translate-y-[1px]'>
                    <p className='text-left'>Análisis de curriculos con Inteligencia Artificial</p>
                    <img className='w-[35%]' src={AILogo} alt="" />
                </Link>
            </div>
        </SlowlyShowing>
    )
}