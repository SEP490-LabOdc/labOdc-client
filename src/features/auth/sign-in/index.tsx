import { Building2, User, Briefcase } from 'lucide-react'
import { useSearch } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserAuthForm } from './components/user-auth-form'
import { CompanyAuthForm } from './components/company-auth-form'
import { GoogleLoginButton } from './components/google-login-button'
import { TwoColumnAuthLayout } from '../components/two-column-auth-layout'
import { useState, useEffect } from 'react'

export default function SignIn() {
  const { redirect, mode } = useSearch({ from: '/(auth)/sign-in/' })
  const [activeTab, setActiveTab] = useState<'user' | 'company'>((mode as 'user' | 'company') || 'user')

  useEffect(() => {
    if (mode === 'company') {
      setActiveTab('company')
    }
  }, [mode])

  return (
    <TwoColumnAuthLayout
      title="Chào mừng đến với LabOdc"
      description={
        activeTab === 'user'
          ? 'Biến kiến thức thành trải nghiệm thực tế cùng các dự án doanh nghiệp.'
          : 'Đăng nhập để quản trị tuyển dụng, đăng tin và theo dõi ứng viên — tất cả trong một bảng điều khiển'
      }
      icon={Building2}
      leftColumn={
        <>
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {activeTab === 'user' ? 'Chào mừng bạn đã quay trở lại' : 'Chào mừng trở lại!'}
            </h1>
            <p className="text-base text-foreground/80">
              {activeTab === 'user'
                ? 'Hãy biến kiến thức thành trải nghiệm thực tế cùng các dự án doanh nghiệp.'
                : 'Đăng nhập để tiếp tục quản lý và kết nối với talent.'}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'user' | 'company')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Người dùng
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Doanh nghiệp
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-4">
              <GoogleLoginButton
                className="relative"
                theme="outline"
                width="100%"
                size="large"
                auto_select={false}
              />
              <UserAuthForm redirectTo={redirect} />
            </TabsContent>

            <TabsContent value="company" className="space-y-4">
              <CompanyAuthForm redirectTo={redirect} />
            </TabsContent>
          </Tabs>
        </>
      }
    />
  )
}
