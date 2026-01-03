import { CompanySidebar } from '../company-detail/companies-sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CompanyOverviewTab } from '../company-detail/companies-overview-tab'
import { CompanyProjects } from '../company-detail/companies-projects'
import { CompanyPageHeader } from '../components/companies-page-header-props'

export default function EditCompany({ company }: { company: any }) {

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <CompanyPageHeader />
                <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <CompanySidebar company={company} />
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 h-auto bg-gray-100 p-1 rounded-md">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Tổng quan</TabsTrigger>
                                <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Dự án</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-6">
                                <CompanyOverviewTab company={company} />
                            </TabsContent>

                            <TabsContent value="projects" className="mt-6">
                                <CompanyProjects />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}

{/* <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Thông tin công ty</h2>
                    <p className='text-muted-foreground'>
                        Xem thông tin công ty tại đây.
                    </p>
                </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <CompanyForm mode='edit' initialData={company} />
            </div> */}