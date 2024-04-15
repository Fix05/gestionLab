import styled from 'styled-components'

const Form = styled.form`

position: absolute;
top: -66px;
right: 0px;
z-index: 10;
`
export default function SearchInput({onSearchChange}) {


    const handleChange = (ev) => { 
        onSearchChange(ev.target.value)
     }

    return (

        <Form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative h-10">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input onChange={handleChange} type="search" id="default-search" className="h-10 right-0 block w-48 p-4 ps-10 end-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." />
            </div>
        </Form>
    )
}

