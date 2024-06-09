import HorizontalBarsChart from '../../../components/dashboardComponents/horizontalBarsChart'
import StackBarsChart from '../../../components/dashboardComponents/stackedBarsChart'
import LineChart from '../../../components/dashboardComponents/lineChart'
import PieChart from '../../../components/dashboardComponents/pieChart'
import SlowlyShowing from '../../../components/slowlyShowing'
import { Container } from '../../../styledComponents/detailsBox'
import LoadingModal from '../../../components/loadingModal'
import { useState, useEffect } from 'react'


export default function Dashboard() {

    const [loading, setLoading] = useState(true)
    const [loadingCharts, setLoadingCharts] = useState({
        stack: true,
        pie: true,
        line: true,
        horizontal: true
    })


    useEffect(() => {
        console.log(loadingCharts);
        const anyTrue = Object.values(loadingCharts).includes(true)
        anyTrue ? setLoading(true) : setLoading(false)

    }, [loadingCharts])

    return (
        <>
            <LoadingModal loading={loading} text={''} />
            {/* <Container height={'450px'} className='mt-2 max-h-[400px]'> */}
                <div className={` grid grid-cols-5 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex justify-center mt-4 rounded-lg bg-opacity-85 border-2 col-span-3 border-gray-400 mx-2 bg-white ">
                        <StackBarsChart setLoading={setLoadingCharts} />
                    </div>
                    <div className="flex justify-center mt-4 rounded-lg bg-opacity-85 border-2 col-span-2 border-gray-400 mx-2 bg-white">
                        <PieChart setLoading={setLoadingCharts} />
                    </div>
                    <div className="flex relative items-center justify-center mt-4 rounded-lg bg-opacity-85 border-2 col-span-2 border-gray-400 mx-2 bg-white">
                        <LineChart setLoading={setLoadingCharts} />
                    </div>
                    <div className="flex justify-center mt-4 rounded-lg border-2 bg-opacity-85 col-span-3 border-gray-400 mx-2 bg-white">
                        <HorizontalBarsChart setLoading={setLoadingCharts} />
                    </div>
                </div>
            {/* </Container> */}
        </>
    )
}