'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'about me' },
  { href: '/experience', label: 'experience' },
  { href: '/projects', label: 'projects' },
  { href: '/writing', label: 'reading' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,10,0.85)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-end px-6 md:px-8 py-5">
        <ul className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    text-sm uppercase tracking-wider transition-colors duration-200
                    ${isActive
                      ? 'text-white font-medium'
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
      </div>
    </nav>
  );
}
