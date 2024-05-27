import React from "react";

import StackBarsChart from '../../../components/dashboardComponents/stackedBarsChart'
import LineChart from '../../../components/dashboardComponents/lineChart'
import PieChart from '../../../components/dashboardComponents/pieChart'
import HorizontalBarsChart from '../../../components/dashboardComponents/horizontalBarsChart'
import SlowlyShowing from '../../../components/slowlyShowing'

export default function Dashboard() {

    return (
        <SlowlyShowing time={100}>
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
        </SlowlyShowing>
    )
}