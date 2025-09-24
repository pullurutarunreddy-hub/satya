'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
        <path d="M12 6C9.24 6 7 8.24 7 11C7 12.76 7.85 14.29 9.06 15.24L12 18L14.94 15.24C16.15 14.29 17 12.76 17 11C17 8.24 14.76 6 12 6ZM12 13.5C10.62 13.5 9.5 12.38 9.5 11C9.5 9.62 10.62 8.5 12 8.5C13.38 8.5 14.5 9.62 14.5 11C14.5 12.38 13.38 13.5 12 13.5Z" fill="currentColor"/>
    </svg>
);


export function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <Logo />
          <span className="font-bold font-headline text-lg">Satya Community Chits</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Home
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
            {loading ? null : user ? (
              <div className='flex items-center gap-4'>
                <span className='text-sm text-muted-foreground'>{user.phoneNumber}</span>
                <Button variant="ghost" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/login">Login / Sign Up</Link>
              </Button>
            )}
        </div>
      </div>
    </header>
  );
}
