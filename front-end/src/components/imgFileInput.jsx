import { Input, LabelFile, Container } from '../styledComponents/inputFile'
import InputFileSvg from '../styledComponents/inputFileSvg'

export default function ImgFileInput({ handleChange, listActivated, list, image, id }) {


    return (
        <>
            <div className={`relative  w-[250px] max-w-[120px] ${listActivated ? '' : 'h-[120px] border-2 border-gray-400 border-dashed'} rounded`}>
                <LabelFile htmlFor={id} className={`static bg-gray-50 z-10 overflow-hidden w-full h-full transition-all ${listActivated ? ' opacity-0 ' : ''}`}>
                    <InputFileSvg />
                    <p className={`text-sm transition-all ${listActivated ? 'opacity-0 pointer-events-none h-0' : ''}`}>Click para seleccionar imagen!</p></LabelFile
                >
                {image &&
                    <>
                        <div className=' static top-0 right-0 text-nowrap truncate w-full border-gray-300 border-solid border-2 rounded-full'>
                            <img className='' src={image} alt="" />
                        </div>
                        <p className='text-sm bg-blue-100 truncate font-medium'>{list[0].name}</p>
                    </>
                }
            </div>
            <Input onChange={handleChange} id={id} accept=".jpeg, .jpg, .png" type="file" />
        </>
    )


}