import { type SVGProps } from 'react'
import { Root as Radio, Item } from '@radix-ui/react-radio-group'
import { CircleCheck, RotateCcw, Settings } from 'lucide-react'
import { IconDir } from '@/assets/custom/icon-dir'
import { IconLayoutCompact } from '@/assets/custom/icon-layout-compact'
import { IconLayoutDefault } from '@/assets/custom/icon-layout-default'
import { IconLayoutFull } from '@/assets/custom/icon-layout-full'
import { IconSidebarFloating } from '@/assets/custom/icon-sidebar-floating'
import { IconSidebarInset } from '@/assets/custom/icon-sidebar-inset'
import { IconSidebarSidebar } from '@/assets/custom/icon-sidebar-sidebar'
import { IconThemeDark } from '@/assets/custom/icon-theme-dark'
import { IconThemeLight } from '@/assets/custom/icon-theme-light'
import { IconThemeSystem } from '@/assets/custom/icon-theme-system'
import { cn } from '@/lib/utils'
import { useDirection } from '@/context/direction-provider'
import { type Collapsible, useLayout } from '@/context/layout-provider'
import { useTheme } from '@/context/theme-provider'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useSidebar } from './ui/sidebar'

export function ConfigDrawer() {
    const { setOpen } = useSidebar()
    const { resetDir } = useDirection()
    const { resetTheme } = useTheme()
    const { resetLayout } = useLayout()

    const handleReset = () => {
        setOpen(true)
        resetDir()
        resetTheme()
        resetLayout()
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'
                    aria-label='Mở cài đặt giao diện'
                    aria-describedby='config-drawer-description'
                    className='rounded-full'
                >
                    <Settings aria-hidden='true' />
                </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <SheetHeader className='pb-0 text-start'>
                    <SheetTitle>Cài đặt Giao diện</SheetTitle>
                    <SheetDescription id='config-drawer-description'>
                        Điều chỉnh giao diện và bố cục để phù hợp với sở thích của bạn.
                    </SheetDescription>
                </SheetHeader>
                <div className='space-y-6 overflow-y-auto px-4'>
                    <ThemeConfig />
                    <SidebarConfig />
                    <LayoutConfig />
                    <DirConfig />
                </div>
                <SheetFooter className='gap-2'>
                    <Button
                        variant='destructive'
                        onClick={handleReset}
                        aria-label='Đặt lại tất cả cài đặt về giá trị mặc định'
                    >
                        Đặt lại
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

function SectionTitle({
    title,
    showReset = false,
    onReset,
    className,
}: {
    title: string
    showReset?: boolean
    onReset?: () => void
    className?: string
}) {
    return (
        <div
            className={cn(
                'text-muted-foreground mb-2 flex items-center gap-2 text-sm font-semibold',
                className
            )}
        >
            {title}
            {showReset && onReset && (
                <Button
                    size='icon'
                    variant='secondary'
                    className='size-4 rounded-full'
                    onClick={onReset}
                >
                    <RotateCcw className='size-3' />
                </Button>
            )}
        </div>
    )
}

function RadioGroupItem({
    item,
    isTheme = false,
}: {
    item: {
        value: string
        label: string
        icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement
    }
    isTheme?: boolean
}) {
    return (
        <Item
            value={item.value}
            className={cn('group outline-none', 'transition duration-200 ease-in')}
            aria-label={`Chọn ${item.label.toLowerCase()}`}
            aria-describedby={`${item.value}-description`}
        >
            <div
                className={cn(
                    'ring-border relative rounded-[6px] ring-[1px]',
                    'group-data-[state=checked]:ring-primary group-data-[state=checked]:shadow-2xl',
                    'group-focus-visible:ring-2'
                )}
                role='img'
                aria-hidden='false'
                aria-label={`Xem trước tùy chọn ${item.label}`}
            >
                <CircleCheck
                    className={cn(
                        'fill-primary size-6 stroke-white',
                        'group-data-[state=unchecked]:hidden',
                        'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'
                    )}
                    aria-hidden='true'
                />
                <item.icon
                    className={cn(
                        !isTheme &&
                        'stroke-primary fill-primary group-data-[state=unchecked]:stroke-muted-foreground group-data-[state=unchecked]:fill-muted-foreground'
                    )}
                    aria-hidden='true'
                />
            </div>
            <div
                className='mt-1 text-xs'
                id={`${item.value}-description`}
                aria-live='polite'
            >
                {item.label}
            </div>
        </Item>
    )
}

function ThemeConfig() {
    const { defaultTheme, theme, setTheme } = useTheme()
    return (
        <div>
            <SectionTitle
                title='Chủ đề'
                showReset={theme !== defaultTheme}
                onReset={() => setTheme(defaultTheme)}
            />
            <Radio
                value={theme}
                onValueChange={setTheme}
                className='grid w-full max-w-md grid-cols-3 gap-4'
                aria-label='Chọn tùy chọn chủ đề'
                aria-describedby='theme-description'
            >
                {[
                    {
                        value: 'system',
                        label: 'Hệ thống',
                        icon: IconThemeSystem,
                    },
                    {
                        value: 'light',
                        label: 'Sáng',
                        icon: IconThemeLight,
                    },
                    {
                        value: 'dark',
                        label: 'Tối',
                        icon: IconThemeDark,
                    },
                ].map((item) => (
                    <RadioGroupItem key={item.value} item={item} isTheme />
                ))}
            </Radio>
            <div id='theme-description' className='sr-only'>
                Chọn giữa tùy chọn hệ thống, chế độ sáng hoặc chế độ tối
            </div>
        </div>
    )
}

function SidebarConfig() {
    const { defaultVariant, variant, setVariant } = useLayout()
    return (
        <div className='max-md:hidden'>
            <SectionTitle
                title='Thanh bên'
                showReset={defaultVariant !== variant}
                onReset={() => setVariant(defaultVariant)}
            />
            <Radio
                value={variant}
                onValueChange={setVariant}
                className='grid w-full max-w-md grid-cols-3 gap-4'
                aria-label='Chọn kiểu thanh bên'
                aria-describedby='sidebar-description'
            >
                {[
                    {
                        value: 'inset',
                        label: 'Lồng vào',
                        icon: IconSidebarInset,
                    },
                    {
                        value: 'floating',
                        label: 'Nổi',
                        icon: IconSidebarFloating,
                    },
                    {
                        value: 'sidebar',
                        label: 'Thanh bên',
                        icon: IconSidebarSidebar,
                    },
                ].map((item) => (
                    <RadioGroupItem key={item.value} item={item} />
                ))}
            </Radio>
            <div id='sidebar-description' className='sr-only'>
                Chọn giữa bố cục thanh bên lồng vào, nổi hoặc tiêu chuẩn
            </div>
        </div>
    )
}

function LayoutConfig() {
    const { open, setOpen } = useSidebar()
    const { defaultCollapsible, collapsible, setCollapsible } = useLayout()

    const radioState = open ? 'default' : collapsible

    return (
        <div className='max-md:hidden'>
            <SectionTitle
                title='Bố cục'
                showReset={radioState !== 'default'}
                onReset={() => {
                    setOpen(true)
                    setCollapsible(defaultCollapsible)
                }}
            />
            <Radio
                value={radioState}
                onValueChange={(v) => {
                    if (v === 'default') {
                        setOpen(true)
                        return
                    }
                    setOpen(false)
                    setCollapsible(v as Collapsible)
                }}
                className='grid w-full max-w-md grid-cols-3 gap-4'
                aria-label='Chọn kiểu bố cục'
                aria-describedby='layout-description'
            >
                {[
                    {
                        value: 'default',
                        label: 'Mặc định',
                        icon: IconLayoutDefault,
                    },
                    {
                        value: 'icon',
                        label: 'Thu gọn',
                        icon: IconLayoutCompact,
                    },
                    {
                        value: 'offcanvas',
                        label: 'Toàn màn hình',
                        icon: IconLayoutFull,
                    },
                ].map((item) => (
                    <RadioGroupItem key={item.value} item={item} />
                ))}
            </Radio>
            <div id='layout-description' className='sr-only'>
                Chọn giữa chế độ bố cục mở rộng mặc định, thu gọn chỉ biểu tượng hoặc toàn màn hình
            </div>
        </div>
    )
}

function DirConfig() {
    const { defaultDir, dir, setDir } = useDirection()
    return (
        <div>
            <SectionTitle
                title='Hướng'
                showReset={defaultDir !== dir}
                onReset={() => setDir(defaultDir)}
            />
            <Radio
                value={dir}
                onValueChange={setDir}
                className='grid w-full max-w-md grid-cols-3 gap-4'
                aria-label='Chọn hướng trang web'
                aria-describedby='direction-description'
            >
                {[
                    {
                        value: 'ltr',
                        label: 'Trái sang Phải',
                        icon: (props: SVGProps<SVGSVGElement>) => (
                            <IconDir dir='ltr' {...props} />
                        ),
                    },
                    {
                        value: 'rtl',
                        label: 'Phải sang Trái',
                        icon: (props: SVGProps<SVGSVGElement>) => (
                            <IconDir dir='rtl' {...props} />
                        ),
                    },
                ].map((item) => (
                    <RadioGroupItem key={item.value} item={item} />
                ))}
            </Radio>
            <div id='direction-description' className='sr-only'>
                Chọn giữa hướng trang web từ trái sang phải hoặc từ phải sang trái
            </div>
        </div>
    )
}