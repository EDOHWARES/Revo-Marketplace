import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageStore } from '@/store/languageStore';
import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import CartWidget from './CartWidget';
import UserMenu from './UserMenu';
import LanguageSwitcher from '@/components/header/LanguageSwitcher';

const MarketplaceHeader = () => {
  const { language, setLanguage } = useLanguageStore();
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <header className="w-full bg-white">
      <div className="w-full bg-[#375B42] dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
        <LanguageSwitcher />
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

            <SearchBar className="mx-auto flex-1 items-center" />

            <div className='ml-auto flex items-center'>
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