

import { useState, useEffect } from 'react'


const useFileInput = () => {


    const [files, setFiles] = useState([])
    const [infoFilelist, setInfoFilelist] = useState([])
    const [listActivated, setListActivated] = useState(false)

    const removeFromFiles = () => {

    }

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        setFiles([...files, file])
        const fileName = file.name
        const fileFormat = getFormat(fileName)
        setInfoFilelist([...infoFilelist, { name: fileName, format: fileFormat }])
    }

    const getFormat = (fileName) => {
        const dotIndex = fileName.lastIndexOf(".") + 1
        const format = fileName.slice(dotIndex, fileName.length + 1)
        return format

    }

    useEffect(() => {
        infoFilelist.length > 0 ? setListActivated(true) : setListActivated(false)
    }, [files])

    return {
        files,
        infoFilelist,
        listActivated,
        handleFileChange,
    }

}


export default useFileInput