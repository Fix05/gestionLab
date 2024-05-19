import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function ConfirmAction({ open, setOpen, negativeAction, positiveAction, negativeText, positiveText, children, title }) {


    return (

        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
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

                <div className="fixed top-14 inset-0 z-50 w-screen overflow-y-auto">
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
                            <Dialog.Panel className="flex flex-col items-center relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">

                                <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">

                                    <div className="flex flex-col items-center">
                                        <div className='flex flex-row items-center justify-center mb-3'>
                                            <div className="flex mr-[3px] h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg>
                                            </div>
                                            <h1 className='text-orange-700 font-semibold'>{title}</h1>
                                        </div>
                                        <div className="flex text-center ml-1 sm:mt-0 sm:text-left">
                                            <h3 className="flex items-center text-center text-base font-semibold leading-6 text-gray-900">
                                                {children}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-evenly px-4 pb-3 sm:flex sm:flex-row-reverse justify-center sm:px-6">
                                    {positiveAction && (
                                        <button
                                            type="button"
                                            className="my-4 inline-flex w-1/3 justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                            onClick={positiveAction}
                                        >
                                            {positiveText}
                                        </button>)}

                                    {negativeAction && (
                                        <button
                                            type="button"
                                            className="my-4 inline-flex w-1/3 bg-red-600 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                            onClick={negativeAction}
                                        >
                                            {negativeText}
                                        </button>)}

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}