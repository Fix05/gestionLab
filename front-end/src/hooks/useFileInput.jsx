

import { useState, useEffect } from 'react'


const useFileInput = (image) => {

    const [files, setFiles] = useState([])
    const [infoFilelist, setInfoFilelist] = useState([])
    const [listActivated, setListActivated] = useState(false)
    const [previewImage, setPreviewImage] = useState(null);


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
        setFiles([...files, { file: file, id: id }])

        /* if (image) { */
            setPreviewImage(URL.createObjectURL(file))
        /* } else { */
            const fileName = file.name
            const fileFormat = getFormat(fileName)
            setInfoFilelist([...infoFilelist, { name: fileName, format: fileFormat, id: id }])
        
        ev.target.value = null;
    }

    const getFormat = (fileName) => {
        const dotIndex = fileName.lastIndexOf(".") + 1
        const format = fileName.slice(dotIndex, fileName.length + 1)
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
        previewImage
    }

}


export default useFileInput