import GenericModalTemplate from '../../../components/genericModalTemplate'


export default function RecordDetailedInfo({open, setOpen, endpoint, values }) {



    return (

        <GenericModalTemplate open={open} setOpen={setOpen}>
            <div className="flow-root">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Title</dt>
                        <dd className="text-gray-700 sm:col-span-2">Mr</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">John Frusciante</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Occupation</dt>
                        <dd className="text-gray-700 sm:col-span-2">Guitarist</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Salary</dt>
                        <dd className="text-gray-700 sm:col-span-2">$1,000,000+</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Bio</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                        </dd>
                    </div>
                </dl>
            </div>

        </GenericModalTemplate>



    )
}