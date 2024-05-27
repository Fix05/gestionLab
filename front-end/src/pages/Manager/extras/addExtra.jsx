import Adding from '../pageComponents/adding'
import AddExtraModal from './addExtraModal'
import {ExtraMapping} from '../../../mapping/dataMapping'
import SlowlyShowing from '../../../components/slowlyShowing'

export default function addExtra() {

    const ENDPOINT = `http://127.0.0.1:8000/api/extras/get-add-extras-overall`

    return (
        <SlowlyShowing time={100}>
            <Adding apiEndpoint={ENDPOINT} ModalComponent={AddExtraModal} bgcolor={"bg-teal-200"} dataMapping={ExtraMapping}/>
        </SlowlyShowing>
    )
}
