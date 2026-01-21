import './globals.css';
import ReactQueryProvider from './providers/ReactQueryProvider';
import Script from 'next/script';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.hugeicons.com/font/hgi-stroke.css"
        />
  <Script
        src="https://cdn.jsdelivr.net/npm/@iconify-json/hugeicons@1.2.23/index.min.js"
        strategy="beforeInteractive"
      />
      </head>
      <body className='bg-[#f2f5f6]'>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
