import { NextIntlClientProvider } from "next-intl";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import { Roboto } from "next/font/google";
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${roboto.className} bg-[#f2f5f6]`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
