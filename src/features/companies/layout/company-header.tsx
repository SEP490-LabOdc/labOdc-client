import { Link } from '@tanstack/react-router'
import logo from '@/assets/logo-black-text.png'

export function CompanyHeader() {
    return (
        <header className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
            <div className="px-14 h-16 flex items-center justify-between">
                <div className='flex space-x-4'>
                    <div className="flex items-center space-x-2">
                        <Link to='/'>
                            <img src={logo} alt="logo" className='w-18 h-19' />
                        </Link>
                    </div>
                    <p className="flex items-center font-bold">
                        For Company
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to='/sign-in' className='font-semibold'>
                        Sign In
                    </Link>
                </div>
            </div>
        </header>
    )
}
