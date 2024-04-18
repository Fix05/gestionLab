import { useEffect, useState } from 'react'
import second from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { Container } from '../../../styledComponents/detailsBox'
import { PaymentInfoMapping } from '../../../mapping/dataMapping'
import useTransformData from '../../../hooks/useTransformData'
import PaymentInfoTable from '../../../components/paymentInfoTable'

export default function PaymentInfo() {

    const DATA_TO_SEARCH = ["payment", "advaces", "extras"]
    const { paymentId } = useParams()
    const PAYMENT_INFO_ENDPOINT = `http://127.0.0.1:8000/api/payment/get-payment-info/${paymentId}`
    const [paymentInfo] = useFetch(PAYMENT_INFO_ENDPOINT, null, "GET")
    const { changedList } = useTransformData(paymentInfo, PaymentInfoMapping, 10)
    const [cleanData, setCleanData] = useState({})

    useEffect(() => {

        DATA_TO_SEARCH.forEach((name) => {
            changedList.forEach((obj, index) => {
                if (obj.hasOwnProperty(name)) {
                    setCleanData(prevState => ({ ...prevState, [name]: obj[name] }))
                }
            })
        })

    }, [changedList])

    return (

        <Container>



            {/*  {changedList[0].payment &&
            <PaymentInfoTable values={changedList[0].payment}/>}
            {changedList[1] &&
            <PaymentInfoTable values={changedList[1].advances}/>} */}
            {/*{changedList[2].extras &&
            <PaymentInfoTable values={changedList[2].extras}/>} */}


        </Container>

    )
}
