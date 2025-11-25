'use client'

import { useState } from 'react';
import { SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import CustomSelect from './ui/custom-select';
import PriceSlider from './ui/price-slider';

// Filter options data
const makeOptions = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'ford', label: 'Ford' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
];

const modelOptions = [
  { value: 'corolla', label: 'Corolla' },
  { value: 'civic', label: 'Civic' },
  { value: 'mustang', label: 'Mustang' },
  { value: 'x3', label: 'X3' },
  { value: 'camry', label: 'Camry' },
  { value: 'accord', label: 'Accord' },
];

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'silver', label: 'Silver' },
];

const bodyOptions = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'truck', label: 'Truck' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'convertible', label: 'Convertible' },
];

const driveTypeOptions = [
  { value: 'fwd', label: 'FWD – Front-wheel drive' },
  { value: 'rwd', label: 'RWD – Rear-wheel drive' },
  { value: 'awd', label: 'AWD – All-wheel drive' },
  { value: '4wd', label: '4WD – Four-wheel drive' },
];

const transmissionOptions = [
  { value: 'cvt', label: 'CVT' },
  { value: 'automatic', label: 'Automatic' },
  { value: 'dct', label: 'DCT' },
  { value: 'manual', label: 'Manual' },
];

const fuelTypeOptions = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'hybrid', label: 'Hybrid' },
];

const cylindersOptions = [
  { value: '4', label: '4 Cylinders' },
  { value: '5', label: '5 Cylinders' },
  { value: '6', label: '6 Cylinders' },
  { value: '8', label: '8 Cylinders' },
  { value: '10', label: '10 Cylinders' },
  { value: '12', label: '12 Cylinders' },
];

const doorOptions = [
  { value: '2', label: '2 Doors' },
  { value: '4', label: '4 Doors' },
  { value: '5', label: '5 Doors' },
  { value: '6', label: '6 Doors' },
];

const yearOptions = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
];

const SearchForm = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 70000]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    color: '',
    body: '',
    driveType: '',
    transmission: '',
    fuelType: '',
    cylinders: '',
    door: '',
    year: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search filters:', filters);
    console.log('Price range:', priceRange);
    // TODO: Implement actual search logic
  };

  return (
    <div className="rounded-[30px] backdrop-blur-[24px] border border-white/[0.196] bg-white/[0.063]">
      <form onSubmit={handleSubmit} className="p-4 md:p-6">
        {/* Basic Filters Grid - 5 columns on XL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          <CustomSelect
            placeholder="Select Make"
            options={makeOptions}
            value={filters.make}
            onChange={(value) => handleFilterChange('make', value)}
          />
          <CustomSelect
            placeholder="Select Model"
            options={modelOptions}
            value={filters.model}
            onChange={(value) => handleFilterChange('model', value)}
          />
          <CustomSelect
            placeholder="Select Color"
            options={colorOptions}
            value={filters.color}
            onChange={(value) => handleFilterChange('color', value)}
          />
          <CustomSelect
            placeholder="Select Body"
            options={bodyOptions}
            value={filters.body}
            onChange={(value) => handleFilterChange('body', value)}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 md:gap-5 md:col-span-2 lg:col-span-4 xl:col-span-1">
            <button
              type="button"
              onClick={toggleAdvanced}
              className={`h-14 w-14 flex items-center justify-center border rounded-[30px] transition-all duration-400 ${
                showAdvanced
                  ? 'bg-primary border-primary text-white'
                  : 'border-white/[0.47] text-white hover:border-white/70'
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full h-14 px-6 md:px-8 flex items-center justify-center gap-2 transition-all duration-300"
            >
              Search Cars <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters - Conditionally Rendered */}
        <div
          className={`transition-all duration-300 ${
            showAdvanced
              ? 'opacity-100 visible max-h-[1000px] mt-6'
              : 'opacity-0 invisible max-h-0 overflow-hidden'
          }`}
        >
          <div className="rounded-[30px] backdrop-blur-[83px] border border-white/[0.188] bg-[#343432] p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <CustomSelect
                placeholder="Drive Type"
                options={driveTypeOptions}
                value={filters.driveType}
                onChange={(value) => handleFilterChange('driveType', value)}
              />
              <CustomSelect
                placeholder="Transmission"
                options={transmissionOptions}
                value={filters.transmission}
                onChange={(value) => handleFilterChange('transmission', value)}
              />
              <CustomSelect
                placeholder="Fuel Type"
                options={fuelTypeOptions}
                value={filters.fuelType}
                onChange={(value) => handleFilterChange('fuelType', value)}
              />
              <PriceSlider value={priceRange} onChange={setPriceRange} />
              <CustomSelect
                placeholder="Cylinders"
                options={cylindersOptions}
                value={filters.cylinders}
                onChange={(value) => handleFilterChange('cylinders', value)}
              />
              <CustomSelect
                placeholder="Door"
                options={doorOptions}
                value={filters.door}
                onChange={(value) => handleFilterChange('door', value)}
              />
              <CustomSelect
                placeholder="Year"
                options={yearOptions}
                value={filters.year}
                onChange={(value) => handleFilterChange('year', value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
