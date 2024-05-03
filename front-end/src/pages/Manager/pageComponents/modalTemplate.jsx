import {Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function ModalTemplate({open, setOpen, header, secondHeader, handleClick, buttonText, children, }) {



    return(
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setOpen}>
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

                <div className="fixed top-16 inset-0 z-10 w-screen overflow-y-auto">
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
                            <Dialog.Panel className="flex flex-col px-4 items-center relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-1/2">

                                <div className='flex self-start w-full border-solid border-b-2 border-b-gray-400  pl-2'>
                                    <h1 className='text-gray-900 text-base font-semibold my-5'>{header + (" "+secondHeader || "")}</h1>
                                </div>

                                <div className='flex flex-col w-full mt-2 items-center justify-center border-solid border-b-2 border-b-gray-400 p-2'>
                                    {/* <div className='flex self-start mb-4 text-sm'>
                                        <div className='flex flex-row mr-4'>
                                            <p className='font-medium '>Empleado:&nbsp;&nbsp;</p>
                                            <span>{employeeData.name}</span>
                                        </div>
                                        <div className='flex flex-row'>
                                            <p className='font-medium '>Salario:&nbsp;&nbsp;</p>
                                            <span>${employeeData.salary}</span>
                                        </div>
                                    </div> */}

                                    {children}

        
                                </div>

                                <button
                                    type="button"
                                    className="my-2 inline-flex w-1/4 justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                    onClick={handleClick}
                                >
                                    {buttonText || "Aceptar"}
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}