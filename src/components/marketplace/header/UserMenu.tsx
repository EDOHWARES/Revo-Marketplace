import React from 'react';
import { User, LogOut, Settings, ShoppingBag, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { useWallet } from '@/wallet/hooks/useWallet.hook';
import { useWalletStore } from '@/store/walletStore';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '@/store/languageStore';

interface UserMenuProps {
  className?: string;
}

const UserMenu = ({ className }: UserMenuProps) => {
  const t = useTranslations('Marketplace');
  const { connectWallet, disconnectWallet } = useWallet();
  const { address } = useWalletStore();
  const { language } = useLanguageStore();
  const router = useRouter();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (disconnectWallet) {
        await disconnectWallet();
        router.push(`/${language}`);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const handleNavigate = (path: string) => {
    router.push(`/${language}${path}`);
  };

  if (!address) {
    return (
      <Button
        onClick={handleConnect}
        variant="ghost"
        size="sm"
        className={cn("flex items-center gap-2", className)}
      >
        <User className="h-5 w-5" />
        <span>{t('user.connect')}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
        >
          <UserCircle className="h-6 w-6 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{t('user.wallet')}</p>
            <p className="text-xs text-muted-foreground">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>{t('user.profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/orders')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>{t('user.orders')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{t('user.settings')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('user.disconnect')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;