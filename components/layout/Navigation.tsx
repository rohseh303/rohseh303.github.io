'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'about me' },
  { href: '/experience', label: 'experience' },
      { href: '/writing', label: 'reading' },
  { href: '/library', label: 'library', comingSoon: true },
];

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center pr-8 z-50">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          const isComingSoon = item.comingSoon;
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  block text-sm uppercase tracking-wider
                  transition-colors duration-200
                  ${isActive 
                    ? 'text-white font-medium' 
                    : isComingSoon
                    ? 'text-[#666] cursor-not-allowed opacity-50'
                    : 'text-[#a0a0a0] hover:text-white'
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
