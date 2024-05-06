import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EmployeeData, Container } from '../../styledComponents/detailsBox'
import BoxDivider from '../../styledComponents/boxDivider'
import useFetch from '../../hooks/useFetch'
import useTransformData from '../../hooks/useTransformData'
import { RequestsMapping } from '../../mapping/dataMapping'
import Pagination from '../../components/pagination'
import EmployeeRequestTable from '../pageComponents/employeeRequestTable'
import EmployeeRequestInfo from './employeeRequestInfo'


export default function RecordRequest() {

    const { id } = useParams()
    const ELEMENTS_PER_PAGE = 6
    const RRCORD_ENDPOINT = `http://127.0.0.1:8000/api/emplyee_requests/get-requests-record/${id}`

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

        <EmployeeData className={`relative w-full transition  duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
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