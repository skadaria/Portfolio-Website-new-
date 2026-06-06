import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata = {
  title: "Srijal Kadariya",
  description: "Portfolio...",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <RefreshRedirect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}