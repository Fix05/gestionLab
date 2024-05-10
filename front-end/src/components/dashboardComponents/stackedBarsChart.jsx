import { Bar } from 'react-chartjs-2';
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'

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
            text: 'Ausencias por Empleado'
        },
        layout: {
            padding: 20
        },
        legend: {
            labels: {
                padding: 10,
                font: {
                    size: 10
                }
            }
        }
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
            stacked: true
        }
    },

}



export default function StackBarsChart() {

    const ABSENCES_ENDPOINT = `http://127.0.0.1:8000/api/stadistics/get-absences-vs-employee-vs-type`
    const [absencesResult] = useFetch(ABSENCES_ENDPOINT, null, "GET")
    const absencesHasData = Object.keys(absencesResult).length > 0
    const [data, setData] = useState({})

    useEffect(() => {
        if (Object.keys(absencesResult).length > 0) {

            const names = absencesResult.map((element) => element["name"])
            const label1 = absencesResult.map((element) => element["Salud"])
            const label2 = absencesResult.map((element) => element["Calamidad doméstica"])
            const label3 = absencesResult.map((element) => element["Otro"])



            const newData = {
                labels: names,
                datasets: [
                    {
                        label: 'Salud',
                        data: label1,
                        backgroundColor: "rgb(99, 166, 216)",
                    },
                    {
                        label: 'Otro',
                        data: label3,
                        backgroundColor: "rgb(99, 216, 134)",
                    },
                    {
                        label: 'Calamidad doméstica',
                        data: label2,
                        backgroundColor: "rgb(99, 216, 198)",
                    },     
                ]
            }

            setData(newData)
        }

    }, [absencesResult])


    return (

        <div className='w-[90%]'>
            {console.log(Object.keys(data).length>0)}
            {Object.keys(data).length>0 &&
                <Bar data={data} options={OPTIONS} />
            }
        </div>

    )

}

