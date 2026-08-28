import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crown Paints East Africa — E-Procurement Portal",
  description:
    "Official E-Procurement Portal for Crown Paints East Africa (Kenya, Uganda, Tanzania & Chromex Colourant). Streamline sourcing, supplier registration, RFQs, and contract management in a verified ecosystem.",
  keywords: [
    "Crown Paints East Africa",
    "Crown Paints Kenya",
    "Regal Paints Uganda",
    "Crown Paints Tanzania",
    "Chromex Colourant",
    "E-Procurement",
    "Supplier Registration",
    "Tenders",
    "Procurement Portal",
  ],
  authors: [{ name: "Crown Paints East Africa" }],
  icons: {
    icon: "/images/logo/logo.png",
    shortcut: "/images/logo/logo.png",
    apple: "/images/logo/logo.png",
  },
  openGraph: {
    title: "Crown Paints East Africa — E-Procurement Portal",
    description:
      "Gateway to streamlined, verified, and transparent procurement processes across East Africa.",
    siteName: "Crown Paints E-Procurement",
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/images/logo/logo.png" type="image/png" />
      </head>
      <body
        className="min-h-full flex flex-col antialiased bg-white text-slate-900 selection:bg-[#32298A]/10 selection:text-[#32298A]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
