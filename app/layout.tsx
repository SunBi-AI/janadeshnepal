import '@/lib/polyfills';
import './globals.css';
import ReactQueryProvider from './providers/ReactQueryProvider';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
