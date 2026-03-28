import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LifeSync",
  description: "Capture anything",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#000000",
  icons: {
    icon: "/icon.png"
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* iOS App Behavior */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Prevent zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />

        {/* App Icon */}
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>

      <body className="bg-gray-100">{children}</body>
    </html>
  );
}