import { Pie } from 'react-chartjs-2';
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            maxWidth: 60,
            align: 'start',
            labels: {
                font: {
                    size: 10
                },
                boxWidth: 20,
            }
        },
        title: {
            display: true,
            text: 'Tipo de solicitudes según su cantidad'
        }
    }
};



export default function PieChart({setLoading}) {

    const REQUEST_TYPES_ENDPOINT = `http://127.0.0.1:8000/api/stadistics/get-count-requests-vs-type`
    const [requestsTypesResult, , , loading] = useFetch(REQUEST_TYPES_ENDPOINT, null, "GET", true, null, true)
    const [data, setData] = useState({})

    useEffect(()=>{
        setLoading(prevState => ({...prevState, pie:loading}))
    }, [loading])

    useEffect(() => {
        if (Object.keys(requestsTypesResult).length > 0) {

            const types = requestsTypesResult.map((element) => element["type_request"])
            const count = requestsTypesResult.map((element) => element["type_count"])

            const newData = {
                labels: types,
                datasets: [
                    {
                        label: 'Solicitudes',
                        data: count,
                        backgroundColor: ['rgb(153,102,255)', 'rgb(255,99,132)', 'rgb(255,159,64)', 'rgb(255,205,86)', 'rgb(75,192,192)', 'rgb(54,162,235)'],
                    }
                ]
            };

            setData(newData)

        }
    }, [requestsTypesResult])

    return (

        <div className='w-[70%]'>
            {Object.keys(data).length > 0 &&
                <Pie data={data} options={OPTIONS} />
            }
        </div>

    )

}

