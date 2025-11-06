import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Check, ChevronDown } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type MultiSelectDropdownProps = {
    items: { label: string; value: string }[]
    value: string[]
    onChange: (values: string[]) => void
    placeholder?: string
    disabled?: boolean
}

export function MultiSelectDropdown({
    items,
    value,
    onChange,
    placeholder = 'Chọn...',
    disabled,
}: MultiSelectDropdownProps) {
    const [open, setOpen] = useState(false)

    const toggleValue = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val))
        } else {
            onChange([...value, val])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between"
                    disabled={disabled}
                >
                    <div className="flex flex-wrap gap-1">
                        {value.length > 0 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge variant="outline" className="text-muted-foreground cursor-pointer">
                                            +{value.length} kỹ năng được chọn
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="max-w-[200px] text-sm">
                                            {value.map(v => items.find(i => i.value === v)?.label).join(', ')}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>)}
                        {
                            value.length == 0 && ("Chưa có kỹ năng nào được chọn")
                        }
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    onSelect={() => toggleValue(item.value)}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value.includes(item.value) ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
