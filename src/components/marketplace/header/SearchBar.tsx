import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList 
} from "@/components/ui/command";

interface SearchBarProps {
  className?: string;
}

interface SearchResult {
  id: number;
  name: string;
  category: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (value: string) => {
   
    const mockResults: SearchResult[] = [
      { id: 1, name: 'Organic Tomatoes', category: 'Vegetables' },
      { id: 2, name: 'Fresh Apples', category: 'Fruits' },
      { id: 3, name: 'Local Honey', category: 'Other' },
    ].filter(item => 
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(mockResults);
  };

  return (
    <div className={`relative max-w-2xl ${className}`}>
     
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full py-2 px-4 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-revolutionary_green/50"
          onClick={() => setOpen(true)}
          readOnly
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
        />
      </div>

      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search for products..." 
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {searchResults.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{result.name}</span>
                  <span className="text-sm text-gray-500">{result.category}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;