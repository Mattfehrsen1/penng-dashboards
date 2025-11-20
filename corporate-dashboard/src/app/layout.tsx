import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const ttCommons = localFont({
  src: [
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT_Commons_Pro_Trial_Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-tt-commons',
});

export const metadata: Metadata = {
  title: 'Penng Corporate Dashboard',
  description: 'Corporate wellness analytics and engagement platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ttCommons.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
