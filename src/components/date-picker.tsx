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
  placeholder?: string,
  disabled?: boolean
  minDate?: Date
}

export function DatePicker({
  selected,
  onSelect,
  placeholder = 'Chọn ngày',
  disabled,
  minDate,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!selected}
          className='data-[empty=true]:text-muted-foreground w-full max-w-[300px] justify-start text-start font-normal'
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
          disabled={(date: Date) => {
            if (disabled) return true
            if (minDate) {
              const min = new Date(minDate)
              min.setHours(0, 0, 0, 0)
              const checkDate = new Date(date)
              checkDate.setHours(0, 0, 0, 0)
              return checkDate < min
            }
            return false
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
