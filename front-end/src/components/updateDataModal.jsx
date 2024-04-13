import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useFetch from '../hooks/useFetch'
import useField from '../hooks/useField'

import dictionary from '../dictionaries/employeeInfo.json'

export default function UpdateDataModal({ field, open, setOpen, currentValue, id, doFetch}) {

    const inputValue = useField();
    const [data, setData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const URL = `http://127.0.0.1:8000/api/rh/update-employee-info/${id}`
    const [result] = useFetch(URL, data, "PUT")


    const handleClick = (ev) => {
        if (inputValue.field != "") {;
            setData({ [field]: inputValue.field })
            setOpen(false) 
        } else {;
            setErrorMessage(`Introduzca un ${dictionary[field].name.toLowerCase()} válido`)
        }
    }

    useEffect(() => {
        setErrorMessage('')
        return () => inputValue.setField("")
    }, [open])


    return (

        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                                <form action="">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                                        <div className="flex justify-center mb-5">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-sky-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                                </svg>
                                            </div>
                                            <div className="flex text-center ml-1 sm:mt-0 sm:text-left">
                                                <h3 className="flex items-center text-base font-semibold leading-6 text-gray-900">
                                                    Actualizar {field ? dictionary[field].name.toLowerCase() : null}
                                                </h3>
                                            </div>
                                        </div>
                                        <div>
                                            <input autoComplete='off' onChange={inputValue.handleChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder={currentValue} required />
                                            <span className='flex justify-center text-xs text-red-700'>{errorMessage}</span>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-center sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:w-auto focus:outline-none"
                                            onClick={handleClick}
                                        >
                                            Actualizar campo
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}