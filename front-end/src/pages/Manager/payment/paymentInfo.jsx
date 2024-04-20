import { useEffect, useState } from 'react'
import second from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

import { PaymentInfoMapping } from '../../../mapping/dataMapping'
import useTransformData from '../../../hooks/useTransformData'
import PaymentInfoTable from '../../../components/paymentInfoTable'
import PaidTable from '../../../components/paidTable'
import { EmployeeData, Container, Div, Info } from '../../../styledComponents/detailsBox'

export default function PaymentInfo() {

    const DATA_TO_SEARCH = ["payment", "advances", "extras"]
    const { paymentId } = useParams()
    const PAYMENT_INFO_ENDPOINT = `http://127.0.0.1:8000/api/payment/get-payment-info/${paymentId}`
    const PAID_EXTRA_ADVANCE_ENDPOINT = `http://127.0.0.1:8000/api/payment/paid-extras-and-advances/${paymentId}`
    const [paymentInfo] = useFetch(PAYMENT_INFO_ENDPOINT, null, "GET")
    const [paidInfo] = useFetch(PAID_EXTRA_ADVANCE_ENDPOINT, null, "GET")
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
        <EmployeeData>
            {cleanData.payment && <Container className=''>
                <Div>
                    <PaidTable values={cleanData.payment} paidInfo={paidInfo}/>
                </Div>
            </Container>}
            {cleanData.advances && <Container>
                <Div>
                    <PaymentInfoTable values={cleanData.advances} />
                </Div>
            </Container>}
            {cleanData.extras && <Container>
                <p>Extras</p>
                <Div>
                    <PaymentInfoTable values={cleanData.extras} />
                </Div>
            </Container>}
        </EmployeeData>
    )
}
