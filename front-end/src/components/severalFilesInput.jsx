import { Input, LabelFile, Container } from '../styledComponents/inputFile'
import InputFileSvg from '../styledComponents/inputFileSvg'
import txt from '../assets/images/txt.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import IconsDictionary from '../dictionaries/fileIcons.json'


export default function SeveralFilesInput({ handleChange, listActivated, list, deleteFile, image, id }) {

    return (
        <>
            <Container>
                {console.log("listActivated", listActivated)}
                <LabelFile htmlFor={id} className={`bg-gray-200  overflow-hidden transition-all ${listActivated ? ' w-16 h-[100%]' : 'h-full w-full'}`}>
                    <InputFileSvg/>
                    <p className={`text-sm transition-all ${listActivated ? 'opacity-0 pointer-events-none h-0' : ''}`}>Click para seleccionar los archivos!</p></LabelFile
                >
                <div className='absolute top-0 left-[64px] text-nowrap truncate max-w-[182px] bg-blue-100'>
                    {list && list.length > 0 &&
                        list.map((file, index) => (
                            <div key={index} className='flex flex-row text-xs p-[2px] border-gray-50 solid border-[1px] rounded-sm'>
                                <img className='w-[8%] mr-[1px]' src={`${IconsDictionary[file.format] ? IconsDictionary[file.format] : txt}`} alt="" />
                                <p className='w-[86%] truncate'>{file.name}</p>
                                <span className='cursor-pointer' id={file.id} onClick={(ev) => { ev.stopPropagation(); deleteFile(file.id); }}> <FontAwesomeIcon icon={faX} /> </span>
                            </div>
                        ))
                    }
                </div>
            </Container>
            <Input onChange={handleChange} id={id} type="file" accept=".doc, .docx, .pdf, .jpeg, .jpg, .png"/>
        </>
    )
}
