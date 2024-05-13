import { Input, LabelFile, Container } from '../styledComponents/inputFile'
import InputFileSvg from '../styledComponents/inputFileSvg'

export default function ImgFileInput({ handleChange, listActivated, list, image, id }) {


    return (
        <>
            <div className={`relative border-2 border-gray-400 border-dashed w-[250px] max-w-[120px] ${listActivated ? '' : 'h-[90px]'}`}>
                <LabelFile htmlFor={id} className={`static bg-gray-200 z-10 overflow-hidden w-full h-full transition-all ${listActivated ? ' opacity-0 ' : ''}`}>
                    <InputFileSvg />
                    <p className={`text-sm transition-all ${listActivated ? 'opacity-0 pointer-events-none h-0' : ''}`}>Click para seleccionar los archivos!</p></LabelFile
                >
                {image &&
                    <div className=' static top-0 right-0 text-nowrap truncate w-full border-4 border-solid border-gray-600'>
                        <img className='' src={image} alt="" />
                    </div>}
                    <p>asdadad</p>
            </div>
            <Input onChange={handleChange} id={id} type="file" />
        </>
    )


}