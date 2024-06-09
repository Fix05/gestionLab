import EmployeeRequestTable from '../pageComponents/employeeRequestTable'
import { EmployeeData, Container } from '../../styledComponents/detailsBox'
import useTransformData from '../../hooks/useTransformData'
import { RequestsMapping } from '../../mapping/dataMapping'
import BoxDivider from '../../styledComponents/boxDivider'
import EmployeeRequestInfo from './employeeRequestInfo'
import Pagination from '../../components/pagination'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'


export default function RecordRequest() {

    const { id } = useParams()
    const ELEMENTS_PER_PAGE = 6
    const RRCORD_ENDPOINT = `http://18.119.103.188:8000/api/emplyee_requests/get-requests-record/${id}`

    const [show, setShow] = useState(false);
    const [listResult] = useFetch(RRCORD_ENDPOINT, null, "GET")
    const { changedList, setChangedList, originalValues,
        setOriginalValues, message, setMessage } = useTransformData(listResult, RequestsMapping, ELEMENTS_PER_PAGE)
    
    const [requestId, setRequestId] = useState()
    const [openInfo, setOpenInfo] = useState(false)

    useEffect(() => {
        setShow(true);
    }, []);

    return (

        <EmployeeData  className={`relative w-full transition  duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <Container className='w-full'>
                <EmployeeRequestInfo id={requestId} open={openInfo} setOpen={setOpenInfo}/>
                <BoxDivider text={`Tus solicitudes`} />
                <EmployeeRequestTable values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-teal-200"} numberOfElements={ELEMENTS_PER_PAGE} setId={setRequestId} setOpen={setOpenInfo}/>
                <div className='flex justify-center mb-8'>
                    <Pagination totalPages={Math.ceil(changedList.length / ELEMENTS_PER_PAGE)} />
                </div>
            </Container>
        </EmployeeData>

    )
}