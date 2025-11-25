'use client'

import * as React from 'react';
import { Slider } from './slider';
import { cn } from '@/lib/utils';

interface PriceSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  className?: string;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 70000,
  className
}) => {
  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}k`;
    return `$${price}`;
  };

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-white text-sm font-medium">Price</p>
      <Slider
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={1000}
        className="w-full"
      />
      <div className="flex justify-between text-white/80 text-xs">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
