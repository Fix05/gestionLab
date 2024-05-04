import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EmployeeData, Container } from '../../styledComponents/detailsBox'
import BoxDivider from '../../styledComponents/boxDivider'
import useFetch from '../../hooks/useFetch'
import useTransformData from '../../hooks/useTransformData'
import {RequestsMapping} from '../../mapping/dataMapping'
import EmployeeRequestTable from '../pageComponents/employeeRequestTable'

export default function RecordRequest() {

    const { id } = useParams()
    const ELEMENTS_PER_PAGE = 6
    const RRCORD_ENDPOINT = `http://127.0.0.1:8000/api/emplyee_requests/get-requests-record/${id}`

    const [show, setShow] = useState(false);
    const [listResult] = useFetch(RRCORD_ENDPOINT, null, "GET")
    const { changedList, setChangedList, originalValues,
        setOriginalValues, message, setMessage } = useTransformData(listResult, RequestsMapping, ELEMENTS_PER_PAGE)
    

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div className={`relative w-full transition duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <EmployeeData className='relative w-full'>
                <Container className='w-full'>
                    <BoxDivider text={`Tus solicitudes`} />
                    <EmployeeRequestTable values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-teal-200"} numberOfElements={ELEMENTS_PER_PAGE}/>

              {/*   
                <div className='relative bg-gray-500 w-[120px] h-[120]'
                >
                    <div className='relative bg-blue-200 w-[80px] h-[80px]'>

                            <div className='absolute right-[-80px] bg-white w-[40px] h-[40px]'>
        
                            </div>
                    </div>

                </div> */}

                </Container>
            </EmployeeData>
        </div>
    )
}