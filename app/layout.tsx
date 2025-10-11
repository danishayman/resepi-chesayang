import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resepi Che Sayang",
  description: "Koleksi resepi masakan dari Che Sayang",
  openGraph: {
    title: "Resepi Che Sayang",
    description: "Koleksi resepi masakan dari Che Sayang",
    url: "https://www.resepika.my",
    siteName: "Resepi Che Sayang",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Resepi Che Sayang",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resepi Che Sayang",
    description: "Koleksi resepi masakan Malaysia dari Che Sayang",
    images: ["/preview.png"],
  },
  other: {
    "apple-mobile-web-app-title": "Resepi KA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200">

        </footer>
        <Analytics />

        {/* Fixed credit at bottom right */}
        <div className="fixed bottom-1 right-1 z-50">
          <a 
            href="https://danishaiman.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-900 text-white text-xs px-3 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-1"
          >
            <span>Created by</span>
            <span className="font-medium underline">@danishayman</span>
          </a>
        </div>

      </body>
    </html>
  );
}
