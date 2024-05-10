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

    return (
        <div className="mt-2 grid grid-cols-5">
            <div className="flex justify-center mt-4 rounded-lg bg-opacity-85 border-2 col-span-3 border-gray-400 mx-2 bg-white ">
                <StackBarsChart />
            </div>
            <div className="flex justify-center mt-4 rounded-lg bg-opacity-85 border-2 col-span-2 border-gray-400 mx-2 bg-white">
                <PieChart />
            </div>
            <div className="flex items-center justify-center mt-4 rounded-lg bg-opacity-85 border-2 col-span-2 border-gray-400 mx-2 bg-white">
                <LineChart />
            </div>
            <div className="flex justify-center mt-4 rounded-lg border-2 bg-opacity-85 col-span-3 border-gray-400 mx-2 bg-white">
                <HorizontalBarsChart />
            </div>
        </div>

    )
}