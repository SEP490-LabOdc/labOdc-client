import CompanyForm from '../components/companies-forms'
export default function EditCompany({ company }: { company: any }) {

    return (
        <>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Thông tin công ty</h2>
                    <p className='text-muted-foreground'>
                        Xem thông tin công ty tại đây.
                    </p>
                </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <CompanyForm mode='edit' initialData={company} />
            </div>
        </>
    )
}