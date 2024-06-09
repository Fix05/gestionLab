import Months from '../../dictionaries/monthTranslates.json'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const OPTIONS = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Horas extras por tiempo'
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
    scales: {
        x: {
            stacked: true,
            ticks: {
                font: {
                    size: 8
                }
            }
        },
        y: {
            stacked: true
        }
    },
}



export default function LineChart({setLoading}) {

    const EXTRA_ENDPOINT = `http://18.119.103.188:8000/api/stadistics/get-extras-vs-time/MONTH`
    const [extraResult, , ,loading] = useFetch(EXTRA_ENDPOINT, null, "GET", true, null, true)
    const [data, setData] = useState({})

    useEffect(()=>{
        setLoading(prevState => ({...prevState, line:loading}))
    }, [loading])


    const getTranslateMonths = (list) => {
        return list.map((element, index) => {
            return Months[element]
        })
    }

    useEffect(() => {
        if (Object.keys(extraResult).length > 0) {

            const months = extraResult.map((element) => element["mes"])
            const formatedMonths = getTranslateMonths(months)
            const label1 = extraResult.map((element) => element["Horas extra"])
            
            const newData = {
                labels: formatedMonths,
                datasets: [
                    {   
                        fill: true,
                        label: 'Horas extra',
                        pointRadius: 5,
                        data: label1,
                        borderColor: 'rgb(2, 136, 254)',
                        backgroundColor: 'rgb(36, 153, 255)',
                    }
                ]
            };
            setData(newData)
        }
    }, [extraResult])

    return (
        <div className='absolute top-0 w-full'>
            {Object.keys(data).length > 0 &&
                <Line data={data} options={OPTIONS} />
            }
        </div>
    )
}

