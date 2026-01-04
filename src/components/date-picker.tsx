import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DatePickerProps = {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  buttonClassName?: string
}

export function DatePicker({
  selected,
  onSelect,
  placeholder = 'Chọn ngày',
  disabled,
  minDate,
  buttonClassName,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!selected}
          className={buttonClassName}
          disabled={disabled}
        >
          {selected ? (
            format(selected, 'dd/MM/yyyy', { locale: vi })
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className='ms-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          captionLayout='dropdown'
          selected={selected}
          onSelect={onSelect}
          locale={vi}
          startMonth={new Date(1900, 0)}
          endMonth={new Date(2100, 11)}
          disabled={minDate
            ? (date: Date) => {
              if (disabled) return true
              return date < minDate
            }
            : disabled
          }
        />
      </PopoverContent>
    </Popover>
  )
}
