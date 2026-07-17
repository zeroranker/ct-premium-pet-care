import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AudioProvider } from "@/lib/audio-context";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "CT Premium Pet Care | Luxury Dog Walking & Pet Sitting",
  description: "Connecticut's premier dog walking and pet sitting service.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-midnight text-slate-50 antialiased">
        <AudioProvider>
          <ToastProvider>
            <Navbar />
            {/* Moved overflow-x-hidden here to prevent iOS body scroll shudder */}
            <main className="relative min-h-screen w-full overflow-x-hidden pt-20">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </AudioProvider>
      </body>
    </html>
  );
}