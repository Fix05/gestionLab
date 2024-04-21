import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BoxDivider from '../../../styledComponents/boxDivider'
import useFetch from '../../../hooks/useFetch'
import { PaymentInfoMapping } from '../../../mapping/dataMapping'
import useTransformData from '../../../hooks/useTransformData'
import PaymentInfoTable from '../../../components/paymentInfoTable'
import PaidTable from '../../../components/paidTable'
import { EmployeeData, Container, Div } from '../../../styledComponents/detailsBox'

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
        <EmployeeData >
            <Container>
                {cleanData.payment && <>
                    <BoxDivider text={"Pago"} />
                    <Div>
                        <PaidTable values={cleanData.payment} paidInfo={paidInfo} />
                    </Div>
                </>}
                {cleanData.advances && <>
                    <BoxDivider text={"Adelantos"} />
                    <Div>
                        <PaymentInfoTable values={cleanData.advances} totalPaid={paidInfo.advance} />
                    </Div>
                </>
                }
                {cleanData.extras && <>
                    <BoxDivider text={"Horas extras"} />
                    <Div>
                        <PaymentInfoTable values={cleanData.extras} totalPaid={paidInfo.extra} />
                    </Div>
                </>}
            </Container>
        </EmployeeData>
    )
}
