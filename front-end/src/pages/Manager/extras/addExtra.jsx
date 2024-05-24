import Adding from '../pageComponents/adding'
import AddExtraModal from './addExtraModal'
import {ExtraMapping} from '../../../mapping/dataMapping'

export default function addExtra() {

    const ENDPOINT = `http://127.0.0.1:8000/api/extras/get-add-extras-overall`

    return (
        <Adding apiEndpoint={ENDPOINT} ModalComponent={AddExtraModal} bgcolor={"bg-teal-200"} dataMapping={ExtraMapping}/>
    )
}
