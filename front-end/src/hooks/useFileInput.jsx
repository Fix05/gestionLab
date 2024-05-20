/* Not necessary and inefficient */

import { useState, useEffect } from 'react'


const useFileInput = (image, limit = 1) => {

    const [files, setFiles] = useState([])
    const [infoFilelist, setInfoFilelist] = useState([])
    const [listActivated, setListActivated] = useState(false)
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState()
    const [showError, setShowError] = useState(false)


    const removeFromFiles = (id) => {
        setFiles(doFilter(files, id))
        setInfoFilelist(doFilter(infoFilelist, id))
    }

    const doFilter = (list, id) => {
        return list.filter((element) => element.id != id)
    }

    const getId = () => {
        const id = files.reduce((accum, current) => {
            if (current.id > accum) {
                return current.id
            }
            return accum
        }, 0) + 1
        return id
    }

    const handleFileChange = (ev) => {

        const file = ev.target.files[0];
        const id = getId()
        const fileName = file.name
        const fileFormat = getFormat(fileName)

        if (image && limit == 1) {
            setFiles([{ file: file, id: id }])
            setInfoFilelist([{ name: fileName, format: fileFormat, id: id }])
        } else if (files.length < limit) {
            setFiles([...files, { file: file, id: id }])
            setInfoFilelist([...infoFilelist, { name: fileName, format: fileFormat, id: id }])
        } else {
            setError('Maximo número de archivos alcanzado')
            setShowError(true)
        }

        setPreviewImage(URL.createObjectURL(file))
        ev.target.value = null;
    }

    const getFormat = (fileName) => {
        const dotIndex = fileName.lastIndexOf(".")
        const format = fileName.slice(dotIndex + 1)
        return format
    }

    useEffect(() => {
        console.log(infoFilelist.length);
        infoFilelist.length > 0 ? setListActivated(true) : setListActivated(false)
    }, [files])

    return {
        files,
        infoFilelist,
        listActivated,
        handleFileChange,
        removeFromFiles,
        previewImage,
        error,
        showError,
        setShowError
    }

}


export default useFileInput