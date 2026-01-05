import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CompanyOverviewTab } from '@/features/company-classic/company-detail/companies-overview-tab'
import { CompanyProjects } from '@/features/company-classic/company-detail/companies-projects'
import { CompanySidebar } from '@/features/company-classic/company-detail/companies-sidebar'
import { CompanyPageHeader } from '@/features/company-classic/components/companies-page-header-props'
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