'use client'

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { cn } from '@/lib/utils';

interface CustomSelectProps {
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  options,
  value,
  onChange,
  className
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "bg-transparent border border-white/[0.196] rounded-[30px] px-6 h-14",
          "text-white placeholder:text-white/60",
          "focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "transition-all duration-300",
          "hover:border-white/30",
          className
        )}
      >
        <SelectValue placeholder={placeholder} className="text-white" />
      </SelectTrigger>
      <SelectContent className="bg-[#343432] border-white/20 text-white rounded-[20px]">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-white focus:bg-primary/20 focus:text-white cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
