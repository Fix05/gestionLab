import Adding from '../pageComponents/adding'
import AddExtraModal from './addExtraModal'
import {ExtraMapping} from '../../../mapping/dataMapping'

export default function addExtra() {


    const ENDPOINT = `http://127.0.0.1:8000/api/extras/get-add-extras-overall`


    /* const ExtraMapping = (element, index) => ({
        Nombre: element.name + ' ' + element.lastname,
        Cedula: element.dni,
        Departamento: element.department,
        Sueldo: element.base_salary,
        Estado: element.state,
        Id: element.id
    }); */


    return (
        <Adding apiEndpoint={ENDPOINT} ModalComponent={AddExtraModal} bgcolor={"bg-teal-200"} dataMapping={ExtraMapping}/>
    )
}
/*     const ELEMENTS_PER_PAGE = 10
    const EMPLOYEE_LIST_URL = `http://127.0.0.1:8000/api/extras/get-add-extras-overall`
    const [listResult] = useFetch(EMPLOYEE_LIST_URL, null, "GET")
    const [changedList, setChangedList] = useState([{}])
    const [originalValues, setOriginalValues] = useState([{}])
    const { tablePage, setTablePage } = useContext(paginationContext);
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [modalData, setModalData] = useState({})

    const HandleChange = (ev) => {
        console.log(ev.target.value);
    }

    useEffect(() => {
        setTablePage(1)
        if (listResult.length) {
            const newEmployeeList = listResult.map((element, index) => ({
                "N°": index + 1,
                Nombre: element.name + ' ' + element.lastname,
                Cedula: element.dni,
                Departamento: element.department,
                Sueldo: element.base_salary,
                Estado: element.state,
                Id: element.id,
                Page: Math.ceil((index + 1) / ELEMENTS_PER_PAGE)
            }));
            setChangedList(newEmployeeList);
            setOriginalValues(newEmployeeList)
        } else {

        }
    }, [listResult]);

    useEffect(() => {
        if (originalValues.length > 1) {
            console.log(id);
            const selectedEmployee = originalValues.find((element) => element.Id == id)
            const { Nombre, Sueldo } = selectedEmployee
            setModalData({ name: Nombre, salary: Sueldo })
        }

    }, [id])

    return (
        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white ">
            <AddExtraModal open={open} setOpen={setOpen} id={id} employeeData={modalData} />
            <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-teal-200"} numberOfElements={ELEMENTS_PER_PAGE} setOpen={setOpen} sthElse={true} setId={setId} />
            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <Pagination totalPages={Math.ceil(changedList.length / 10)} />
            </div>

        </div>
    )
} */