import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

// Premium typography configuration
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Infrascapes - Premium Outdoor Furniture & Design-Build Solutions",
  description: "Transform outdoor spaces with premium modular furniture. Leading supplier of outdoor furniture, playground equipment & design-build services in Hyderabad. 5-year warranty.",
  keywords: "outdoor furniture, playground equipment, fitness equipment, water park equipment, design-build, Hyderabad, modular furniture",
  authors: [{ name: "Infrascapes" }],
  openGraph: {
    title: "Infrascapes - Premium Outdoor Furniture & Design-Build Solutions",
    description: "Transform outdoor spaces with premium modular furniture and comprehensive design-build services.",
    url: "https://infrascapes.in",
    siteName: "Infrascapes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Infrascapes Outdoor Living Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infrascapes - Premium Outdoor Furniture & Design-Build Solutions",
    description: "Transform outdoor spaces with premium modular furniture and comprehensive design-build services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${playfairDisplay.variable} scroll-smooth`}>
      <body className={dmSans.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}