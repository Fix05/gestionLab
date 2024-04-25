import Adding from '../pageComponents/adding'
import AddVacationModal from './addVacationModal'
import {ExtraMapping} from '../../../mapping/dataMapping'


export default function AddVacations() {

    const ENDPOINT = `http://127.0.0.1:8000/api/extras/get-add-extras-overall`


    return (
        <Adding apiEndpoint={ENDPOINT} ModalComponent={AddVacationModal} bgcolor={"bg-red-200"} dataMapping={ExtraMapping}/>
    )
}