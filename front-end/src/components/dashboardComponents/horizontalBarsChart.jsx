import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const OPTIONS = {
    plugins: {
        title: {
            display: true,
            text: 'Tipo de solicitudes por empleado'
        },
        layout: {
            padding: 20
        },
        legend: {
            position: 'bottom',
            align: 'start',
            fullSize: false,
            labels: {
                font: {
                    size: 10
                },
                boxWidth: 20,
                
            }
        }
    },
    indexAxis: 'y',
    elements: {
      
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
            ticks: {
                font:{
                    size: 8
                }
            }
        },
        y: {
            stacked: true,
            ticks: {
                font:{
                    size: 8
                }
            }
        }
    },

}



export default function HorizontalBarsChart({setLoading}) {

    const EMPLOYEE_REQUEST_ENDPOINT = `http://18.119.103.188:8000/api/stadistics/get-requests-vs-employee-vs-type`
    const [employeePerRequestResult, , , loading] = useFetch(EMPLOYEE_REQUEST_ENDPOINT, null, "GET", true, null, true)
    const [data, setData] = useState({})

    useEffect(()=>{
        setLoading(prevState => ({...prevState, horizontal:loading}))
    }, [loading])

    useEffect(() => {
        if (Object.keys(employeePerRequestResult).length > 0) {
            const names = employeePerRequestResult.map((element) => element["name"])
            const vacations = employeePerRequestResult.map((element) => element["Vacaciones"])
            const permissions = employeePerRequestResult.map((element) => element["Permiso"])
            const advances = employeePerRequestResult.map((element) => element["Adelanto"])
            const scheduleChange = employeePerRequestResult.map((element) => element["Cambio de horario"])
            const claims = employeePerRequestResult.map((element) => element["Reclamación"])
            const others = employeePerRequestResult.map((element) => element["Otro"])

            const newData = {
                labels: names,
                datasets: [
                    {
                        label: 'Vacaciones',
                        data: vacations,
                        backgroundColor: "rgb(136, 85, 205)",
                    },
                    {
                        label: 'Permisos',
                        data: permissions,
                        backgroundColor: "rgb(117, 80, 115)",
                    },
                    {
                        label: 'Adelantos',
                        data: advances,
                        backgroundColor: "rgb(130, 104, 165)",
                    },     
                    {
                        label: 'Cambio de horario',
                        data: scheduleChange,
                        backgroundColor: "rgb(188, 180, 211)",
                    },     
                    {
                        label: 'Reclamaciones',
                        data: claims,
                        backgroundColor: "rgb(221, 199, 225)",
                    },     
                    {
                        label: 'Otros',
                        data: others,
                        backgroundColor: "rgb(246, 216, 252)",
                    }  
                ]
            }

            setData(newData)
        }

    }, [employeePerRequestResult])





    return (

        <div className='w-[90%]'>
            {Object.keys(data).length>0 &&
                <Bar data={data} options={OPTIONS} />
            }
        </div>

    )

}

