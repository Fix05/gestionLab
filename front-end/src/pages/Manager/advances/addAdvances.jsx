import Adding from '../pageComponents/adding'
import AddAdvanceModal from './addAdvanceModal'
import { ExtraMapping } from '../../../mapping/dataMapping'
import SlowlyShowing from '../../../components/slowlyShowing'


export default function AddAdvances() {

    const ENDPOINT = `http://18.119.103.188:8000/api/extras/get-add-extras-overall`

    return (
        <SlowlyShowing time={100}>
            <Adding apiEndpoint={ENDPOINT} ModalComponent={AddAdvanceModal} bgcolor={"bg-emerald-200"} dataMapping={ExtraMapping} />
        </SlowlyShowing>

    )
}