import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { ErrorBoundary } from "../components/ErrorBoundary";
import "../globals.css";

export const metadata = {
  // title: "Janadesh Party Nepal",
  // description: "Official website of Janadesh Party Nepal",
  icons: {
    icon: "/assets/favicon.ico",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${roboto.className} bg-[#f2f5f6]`}>
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
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ErrorBoundary>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
