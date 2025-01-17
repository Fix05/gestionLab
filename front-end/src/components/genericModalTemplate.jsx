import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function GenericModalTemplate({zIndex, open, setOpen, handleClick, children, className }) {



    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className={`relative ${zIndex ? zIndex: 'z-50'}`} onClose={setOpen}>
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

                <div className={`fixed top-14 inset-0 ${zIndex ? zIndex: 'z-50'} w-screen overflow-y-auto`}>
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
                            <Dialog.Panel className={`flex flex-col p-[8px] items-center relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ${className}`}>

                                {children}

                                {handleClick &&
                                    <div className='bg-gray-50 w-full flex justify-center mt-4'>
                                        <button
                                            type="button"
                                            className="my-4 inline-flex w-1/4 justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                            onClick={handleClick}
                                        >
                                            Aceptar
                                        </button>
                                    </div>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}