import React, { useEffect } from "react";
import useFetch from '../../../hooks/useFetch'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    /* PieChart, */
    Pie,
    Cell
} from "recharts";
/* import { LineChart, Line } from 'recharts'; */
import Months from '../../../dictionaries/monthTranslates.json'
import StackBarsChart from '../../../components/dashboardComponents/stackedBarsChart'
import LineChart from '../../../components/dashboardComponents/lineChart'
import PieChart from '../../../components/dashboardComponents/pieChart'
import HorizontalBarsChart from '../../../components/dashboardComponents/horizontalBarsChart'

const data = [
    { "name": 'Group A', as: 400 },
    { "name": 'Group B', as: 300 },
    { "name": 'Group C', as: 300 },
    { "name": 'Group D', as: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8042', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text className="pointer-events-none" x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};




export default function Dashboard() {

    const ABSENCES_ENDPOINT = `http://127.0.0.1:8000/api/stadistics/get-absences-vs-employee-vs-type`
    const EXTRA_ENDPOINT = `http://127.0.0.1:8000/api/stadistics/get-extras-vs-time/MONTH`
    const REQUESTS_TYPES_ENDPOINT = `http://127.0.0.1:8000/api/stadistics/get-count-requests-vs-type`
    const [absencesResult] = useFetch(ABSENCES_ENDPOINT, null, "GET")
    const [extraResult] = useFetch(EXTRA_ENDPOINT, null, "GET")
    const [typesResult] = useFetch(REQUESTS_TYPES_ENDPOINT, null, "GET")


    const absencesHasData = Object.keys(absencesResult).length > 0
    const extraHasData = Object.keys(extraResult).length > 0
    const typesHasData = Object.keys(typesResult).length > 0

    console.log(extraResult);

    const getTranslateMonths = (list) => {

        return list.map((element) => {
            element = { ...element, mes: Months[element.mes] }
            return element
        })
    }




    return (
        

        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white grid grid-cols-2">
            <StackBarsChart/>
            <PieChart />
            <HorizontalBarsChart />
            <LineChart/>
            
        </div>


    )
}