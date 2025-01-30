import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguageStore } from '@/store/languageStore';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface NavMenuProps {
  className?: string;
}

const NavMenu = ({ className }: NavMenuProps) => {
  const pathname = usePathname();
  const { language } = useLanguageStore();
  const t = useTranslations('Marketplace');

  const navItems = [
    { label: t('navigation.home'), href: `/${language}` },
    { label: t('navigation.products'), href: `/${language}/products` },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={cn('hidden md:flex items-center space-x-6', className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm transition-colors hover:text-gray-900',
            isActive(item.href) 
              ? 'text-gray-900 font-medium' 
              : 'text-gray-600'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavMenu;