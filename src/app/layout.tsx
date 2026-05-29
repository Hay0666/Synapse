import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/orion/sidebar";
import { SynapseWidget } from "@/components/widget/synapse-widget";
import { NovusProvider } from "@/components/novus-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orion | Project Management",
  description: "Manage your projects and tasks effectively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex`} suppressHydrationWarning>
        <NovusProvider />
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-void relative">
          {children}
        </main>
        <SynapseWidget />
      </body>
    </html>
  );
}
