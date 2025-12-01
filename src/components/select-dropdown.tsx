import { useState } from 'react'
import { IconLoader, IconSearch } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface SelectDropdownProps {
  onValueChange?: (value: string) => void
  defaultValue: string | undefined
  placeholder?: string
  isPending?: boolean
  items: { label: string; value: string; label2: string | null }[] | undefined
  disabled?: boolean
  className?: string
  isControlled?: boolean
  showSearch?: boolean
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
  showSearch = false,
}: SelectDropdownProps) {
  const [search, setSearch] = useState('')

  const defaultState = isControlled
    ? { value: defaultValue, onValueChange }
    : { defaultValue, onValueChange }

  const lower = search.toLowerCase()
  const matchedIds = new Set<string>()

  if (showSearch && search.trim()) {
    items.forEach((item) => {
      const text = `${item.label} ${item.label2 ?? ''}`.toLowerCase()
      if (text.includes(lower)) matchedIds.add(item.value)
    })
  }

  return (
    <Select {...defaultState}>
      <FormControl>
        <SelectTrigger disabled={disabled} className={cn(className)}>
          <div className="flex items-center gap-2">
            {(() => {
              const found = items.find((i) => i.value === defaultValue);
              return found ? (
                <div className="font-medium">{found.label}</div>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              );
            })()}
          </div>
        </SelectTrigger>
      </FormControl>

      <SelectContent className="p-0">
        {showSearch && (
          <div className="sticky top-0 z-10 bg-background p-2 border-b">
            <div className="relative">
              <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
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
          ) : (
            items.map((item) => {
              const isMatch =
                !showSearch || !search || matchedIds.has(item.value)

              return (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className={cn("!p-0 !h-auto", !isMatch && "hidden")}
                >
                  <div className="flex w-full items-center justify-between px-2 py-2">
                    {/* Label bên trái */}
                    <div className="font-medium">{item.label}</div>

                    {/* Email align-right sát mép phải */}
                    {item.label2 && (
                      <div className="text-xs text-muted-foreground whitespace-nowrap text-right ml-4 mr-2">
                        {item.label2}
                      </div>
                    )}
                  </div>
                </SelectItem>
              )
            })
          )}
        </div>
      </SelectContent>
    </Select>
  )
}
