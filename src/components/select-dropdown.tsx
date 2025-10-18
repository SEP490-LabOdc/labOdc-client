import { useState } from 'react'
import { IconLoader, IconSearch } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface SelectDropdownProps {
  onValueChange?: (value: string) => void
  defaultValue: string | undefined
  placeholder?: string
  isPending?: boolean
  items: { label: string; value: string }[] | undefined
  disabled?: boolean
  className?: string
  isControlled?: boolean
  showSearch?: boolean // 👈 Optional prop (mặc định là false)
}

export function SelectDropdown({
  defaultValue,
  onValueChange,
  isPending,
  items = [],
  placeholder,
  disabled,
  className = '',
  isControlled = false,
  showSearch = false, // 👈 Mặc định là không có search
}: SelectDropdownProps) {
  const [search, setSearch] = useState('')

  const defaultState = isControlled
    ? { value: defaultValue, onValueChange }
    : { defaultValue, onValueChange }

  // Nếu không bật search thì không lọc danh sách
  const filteredItems =
    showSearch && search
      ? items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
      : items

  return (
    <Select {...defaultState}>
      <FormControl>
        <SelectTrigger disabled={disabled} className={cn(className)}>
          <SelectValue placeholder={placeholder ?? 'Select'} />
        </SelectTrigger>
      </FormControl>

      <SelectContent className="p-0">
        {/* Optional search bar */}
        {showSearch && (
          <div className="sticky top-0 z-10 bg-background p-2 border-b">
            <div className="relative">
              <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()} // Giữ focus khi gõ
                placeholder="Tìm kiếm..."
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          {isPending ? (
            <SelectItem disabled value="loading" className="h-14">
              <div className="flex items-center justify-center gap-2">
                <IconLoader className="h-5 w-5 animate-spin" />
                Loading...
              </div>
            </SelectItem>
          ) : filteredItems.length > 0 ? (
            filteredItems.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="no-results">
              Không tìm thấy kết quả
            </SelectItem>
          )}
        </div>
      </SelectContent>
    </Select>
  )
}
