'use client'

import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import CustomSelect from './ui/custom-select';
import { brands } from '@/lib/data';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const router = useRouter();
  const [make, setMake] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    // Map 'make' to 'brand' query param to match ShopPage logic
    if (make && make !== 'all') params.set('brand', make);
    if (searchTerm) params.set('search', searchTerm);

    // Navigate to shop page with query params
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="rounded-[30px] backdrop-blur-[24px] border border-white/[0.196] bg-white/[0.063] max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">

          {/* Text Search Input */}
          <div className="w-full flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by keywords (e.g. 'Toyota Camry')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-11 pr-6 rounded-[30px] bg-transparent border border-white/[0.196] text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-white/30"
            />
          </div>

          {/* Make Select */}
          <div className="w-full md:w-[280px]">
            <CustomSelect
              placeholder="Select Make"
              options={brands}
              value={make}
              onChange={(value) => setMake(value)}
            />
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-auto">
            <Button
              type="submit"
              className="w-full md:w-auto min-w-[160px] bg-primary hover:bg-primary/90 text-white font-semibold rounded-full h-14 px-8 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-black/20"
            >
              Search <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default SearchForm;
