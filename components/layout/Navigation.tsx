'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/#projects', label: 'projects' },
  { href: '/writing', label: 'writing' },
  { href: '/resume', label: 'resume' },
];

export default function Navigation({ stackOnMobile = false }: { stackOnMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,10,0.85)] backdrop-blur-xl ${stackOnMobile ? 'pt-14 sm:pt-0' : ''}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-end px-6 md:px-8 py-5">
        <ul className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => {
            const isActive = item.href !== '/#projects' && pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-white font-medium' : 'text-[#a0a0a0] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
