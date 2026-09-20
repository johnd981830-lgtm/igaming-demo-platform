'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/sports', label: 'Sportsbook' },
  { href: '/casino', label: 'Casino' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/admin', label: 'Admin' },
  { href: '/login', label: 'Login' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="topbar-wrap">
      <div className="topbar-shell">
        <Link href="/" className="brand-mark">
          PrimeBet
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'nav-link active' : 'nav-link'}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
