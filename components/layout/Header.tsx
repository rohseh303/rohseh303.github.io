import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 p-8">
      <Link 
        href="/" 
        className="text-xl font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
      >
        ROHAN SEHGAL
      </Link>
    </header>
  );
}
