import styled from 'styled-components'
import { useState, useEffect } from 'react'
import FileIcons from '../dictionaries/fileIcons.json'
import doc from '../assets/images/doc.png'
import pdf from '../assets/images/pdf.png'
import image from '../assets/images/imagen.png'
import txt from '../assets/images/txt.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


const dict = {
    "pdf": pdf,
    "docx": doc,
    "jpeg": image,
    "jpg": image,
    "png": image
}


const Input = styled.input`
max-width: 190px;
display: none;
`


const LabelFile = styled.label`
overflow: hidden;
position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 5px;
color: #404040;
cursor: pointer;
`
const Container = styled.div`
position: relative;
width: 250px;
height: 90px;
border: 2px dashed #ccc;
`

export default function FileInput({ handleChange, listActivated, list, deleteFile, image, id }) {


    return (

        <>
            <Container>
                {console.log("listActivated", listActivated)}
                <LabelFile htmlFor={id} className={`bg-gray-200  overflow-hidden transition-all ${listActivated ? ' w-16 h-[100%]' : 'w-full h-full'}`}>
                    <span>
                        <svg
                            /* className={`transition-all ${listActivated ? 'translate-x-[-100px] translate-y-[+10px]' : ''}`} */
                            /* xmlSpace="preserve" */
                            viewBox="0 0 184.69 184.69"
                            /*  xmlnsXlink="http://www.w3.org/1999/xlink"
                             xmlns="http://www.w3.org/2000/svg" */
                            id="Capa_1"
                            version="1.1"
                            width="35px"
                            height="35px"
                        >
                            <g>
                                <g>
                                    <g>
                                        <path
                                            d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
				C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
				C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
				c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
				c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
				c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
				c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
				v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z">

                                        </path>
                                    </g>
                                    <g>
                                        <path
                                            d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
				c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
				L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
				c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
				C104.91,91.608,107.183,91.608,108.586,90.201z">

                                        </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <p className={`text-sm transition-all ${listActivated ? 'opacity-0 pointer-events-none h-0' : ''}`}>Click para seleccionar los archivos!</p></LabelFile
                >
                {!image ? <div className='absolute top-0 left-[50px] text-nowrap truncate max-w-[195px] bg-blue-100'>
                    {list && list.length > 0 &&
                        list.map((file, index) => (
                            <div key={index} className='flex flex-row text-xs p-[2px] border-gray-50 solid border-[1px] rounded-sm'>
                                <img className='w-[8%] mr-[1px]' src={`${dict[file.format] ? dict[file.format] : txt}`} alt="" />
                                <p className='w-[86%] truncate'>{file.name}</p>
                                <span className='cursor-pointer' id={file.id} onClick={(ev) => { ev.stopPropagation(); deleteFile(file.id); }}> <FontAwesomeIcon icon={faX} /> </span>
                            </div>
                        ))
                    }
                </div> :
                    <div className='absolute top-0  left-[50px] text-nowrap truncate max-w-[195px]'>
                        <div className='flex flex-row content-right items-center'>
                            <p className='truncate'>{list[0].name}</p>
                            <img className='w-[43%]' src={image} alt="" />
                        </div>
                    </div>
                }
            </Container>
            <Input onChange={handleChange} id={id} type="file" />
        </>
    )
}

