/**
 * Shared navigation links used across Navbar and Footer
 */
export const navigationLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/core-values', key: 'coreValues' },
  { href: '/manifesto', key: 'manifesto' },
  { href: '/policies', key: 'policies' },
  { href: '/leadership', key: 'leadership' },
  { href: '/register', key: 'join' },
  { href: '/news', key: 'news' },
  { href: '/contact', key: 'contact' },
] as const;

export type NavigationLink = typeof navigationLinks[number];
