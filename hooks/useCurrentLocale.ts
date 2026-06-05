'use client';

import { usePathname } from 'next/navigation';

export function useCurrentLocale(): 'es' | 'ca' | 'en' {
  const pathname = usePathname();

  if (pathname.startsWith('/ca/')) return 'ca';
  if (pathname.startsWith('/ca')) return 'ca';
  if (pathname.startsWith('/en/')) return 'en';
  if (pathname.startsWith('/en')) return 'en';

  return 'es';
}
