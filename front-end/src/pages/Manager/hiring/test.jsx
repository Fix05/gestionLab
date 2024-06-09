import React, { useState } from 'react';

function Test({files, setFiles, compareFiles}) {
   /*  const [files, setFiles] = useState([]); */

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData2 = new FormData()

        const fillFormData = (form, array) => {
            if (array.length > 0) {
                array.forEach((element) => {
                    form.append(element.file.name, element.file)
                })
            }
        }

        fillFormData(formData2, compareFiles.files)

        for (let pair of formData2.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        
        
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        try {
            const response = await fetch('http://18.119.103.188:8000/api/rh/upload-files/', {
                method: 'POST',
                body: formData2,
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple onChange={handleFileChange} />
                <button type="submit">Upload Files</button>
            </form>
        </div>
    );
}

export default Test;
