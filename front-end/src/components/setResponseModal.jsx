import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {useParams} from 'react-router-dom'
import useFetch from '../hooks/useFetch'


export default function SetResponseModal({ open, setOpen, action, body, requestId, reloadInfo}) {

    const SETURL = `http://127.0.0.1:8000/api/employee/set-response/${requestId}`
    const UPDATEURL = `http://127.0.0.1:8000/api/employee/update-request-state/${requestId}`
    const {id} = useParams() 
    const [data, setData] = useState({})
    const [requestState, setRequestState] = useState({})
    const currentDatetime = new Date();
    const formatedDatetime = currentDatetime.toISOString().slice(0, 19).replace("T", " ");
    const [, setResponseResult] = useFetch(SETURL, data, "POST")
    const [, updateStateResult] = useFetch(UPDATEURL, requestState, "PUT")

    const handleSubmit = async (ev) => {

        await setResponseResult({
            body: body,
            date: formatedDatetime,
            rh: id
        })

        await updateStateResult({state: action})

        reloadInfo()

        
        /* setResponseResult({
            body: body,
            date: formatedDatetime,
            rh: id
        }).then(()=>{
            updateStateResult({state: action}).then(()=>{
                reloadInfo()
            })
        }) */
        setOpen(false)
    }


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
                                    <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">

                                        <div className="flex flex-col items-center">
                                            <div className="flex mb-3 h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg>
                                            </div>
                                            <div className="flex text-center ml-1 sm:mt-0 sm:text-left">
                                                <h3 className="flex items-center text-center text-base font-semibold leading-6 text-gray-900">
                                                    Estas seguro que quieres {action == "Denegado" ? "denegar" : "aprobar"} esta solicitud?
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                    <div className="flex justify-evenly bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-center sm:px-6">
                                        <button
                                            type="button"
                                            className="min-w-24 inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:w-auto focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                            onClick={handleSubmit}
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            type="button"
                                            className="min-w-24 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                            onClick={() => (setOpen(false))}
                                        >
                                            Cambiar
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