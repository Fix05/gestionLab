import DoneAnimation from '../../../components/doneAnimationWindow'
import useTransformData from '../../../hooks/useTransformData'
import LoadingModal from '../../../components/loadingModal'
import Pagination from '../../../components/pagination'
import useBasicData from '../../../hooks/useBasicData'
import useFetch from '../../../hooks/useFetch'
import Table from '../../../components/table'
import { useState } from 'react';


export default function Adding({ apiEndpoint, ModalComponent, bgcolor, dataMapping, addingDoneMessage, addingGif }) {


    const ELEMENTS_PER_PAGE = 10
    const [listResult, getResults, , loading] = useFetch(apiEndpoint, null, "GET", true, null, true)
    const { changedList, setChangedList, originalValues, setOriginalValues } = useTransformData(listResult, dataMapping, ELEMENTS_PER_PAGE)
    const [open, setOpen] = useState(false)
    const { id, setId, modalData } = useBasicData(originalValues)
    const [openAnimation, setOpenAnimation] = useState(false)


    return (
        <>
            <LoadingModal loading={loading} text={""} />
            <div className={`mt-6 rounded-lg border-2 border-gray-400 bg-white transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <DoneAnimation open={openAnimation} setOpen={setOpenAnimation} message={addingDoneMessage} gif={addingGif} />
                <ModalComponent open={open} setOpen={setOpen} id={id} employeeData={modalData} setAnimation={setOpenAnimation} reloadList={getResults} />
                <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={bgcolor} numberOfElements={ELEMENTS_PER_PAGE} setOpen={setOpen} sthElse={true} setId={setId} />
                <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                    <Pagination totalPages={Math.ceil(changedList.length / 10)} />
                </div>
            </div>
        </>
    )
}