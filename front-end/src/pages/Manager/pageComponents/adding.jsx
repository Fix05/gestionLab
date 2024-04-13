import useFetch from '../../../hooks/useFetch'
import useTransformData from '../../../hooks/useTransformData'
import useBasicData from '../../../hooks/useBasicData'
import Table from '../../../components/table'
import {useState} from 'react';
import Pagination from '../../../components/pagination'


export default function Adding({apiEndpoint, ModalComponent, bgcolor, dataMapping}) {


    const ELEMENTS_PER_PAGE = 10
    const [listResult] = useFetch(apiEndpoint, null, "GET")
    const {changedList, setChangedList, originalValues, setOriginalValues} = useTransformData(listResult, dataMapping, ELEMENTS_PER_PAGE)
    const [open, setOpen] = useState(false)
    const {id, setId, modalData} = useBasicData(originalValues)
    /* const [id, setId] = useState()
    const [modalData, setModalData] = useState({}) */

    const HandleChange = (ev) => {
        console.log(ev.target.value);
    }

    /* useEffect(() => {
        if (originalValues.length > 1) {
            const selectedEmployee = originalValues.find((element) => element.Id == id)
            const { Nombre, Sueldo } = selectedEmployee
            setModalData({ name: Nombre, salary: Sueldo })
        }
    }, [id]) */

    return (
        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white ">
            <ModalComponent open={open} setOpen={setOpen} id={id} employeeData={modalData} />
            <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={bgcolor} numberOfElements={ELEMENTS_PER_PAGE} setOpen={setOpen} sthElse={true} setId={setId}/>
            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <Pagination totalPages={Math.ceil(changedList.length / 10)} />
            </div>
        </div>
    )
}