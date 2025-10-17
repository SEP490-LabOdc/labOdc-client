import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

 export interface IData {
  name: string,
  code: number,
  division_type: string,
  codename: string,
  province_code: number
}

interface LocationSelectProps {
  data: IData[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function LocationSelect({data, value, onValueChange, placeholder, disabled = false }: LocationSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full pl-10 border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.code} value={item.code.toString()}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
