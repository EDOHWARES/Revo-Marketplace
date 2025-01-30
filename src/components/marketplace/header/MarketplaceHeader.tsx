import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageStore } from '@/store/languageStore';
import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import CartWidget from './CartWidget';
import UserMenu from './UserMenu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MarketplaceHeader = () => {
  const { language, setLanguage } = useLanguageStore();
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <header className="w-full bg-white">
      <div className="w-full bg-revolutionary_green">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[120px] bg-transparent border-0 text-white focus:ring-0">
              <SelectValue>{language === 'en' ? 'English' : 'Español'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-8">
            <Link href={`/${language}`}>
              <Image
                src="/logo.svg"
                alt="Revolutionary Farmers"
                width={40}
                height={40}
                priority
                className="object-contain"
              />
            </Link>

            <NavMenu className="flex-none" />

            <SearchBar className="flex-1 max-w-2xl" />

            <div className="flex items-center gap-4">
              <CartWidget />
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;