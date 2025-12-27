// src/components/layout/landing-header.tsx
import { Link, useLocation } from '@tanstack/react-router'
import { landingHeaderData } from './data/landing-header-data'
import { checkIsActive } from '@/lib/utils'
import { ProfileDropdown } from '../profile-dropdown'
import { NotificationDropdown } from '../notification-dropdown'
import logo from '@/assets/logo-black-text.png'
import { Button } from '@/components/ui/button.tsx'
import { useAuthStore } from '@/stores/auth-store.ts'

export default function LandingHeader() {
  const href: string = useLocation({ select: (location) => location.href })
  const isAuthenticated = useAuthStore(state => state.isAuthenticated())

  return (
    <header className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="px-10 h-16 flex items-center justify-between">
        <div className='flex space-x-8'>
          <div className="flex items-center space-x-2">
            <Link to='/'>
              <img src={logo} alt="logo" className='w-18 h-19' />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {landingHeaderData.map((item) => (
              <Link
                to={item.url}
                className={`${checkIsActive(href, item) ? "text-brand-orange font-bold" : "text-primary hover:text-secondary"} transition-colors font-semibold`}
                key={item.title}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Link to='/company' className='font-bold'>Tạo dự án ngay</Link>
          </Button>

          {isAuthenticated ? (
            <>
              <NotificationDropdown />
              <ProfileDropdown />
            </>
          ) : (
            <div>
              <Link to='/sign-in' className='font-bold hover:text-secondary font-semibold hover:underline'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
