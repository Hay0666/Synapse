import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script id="pendo-install" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
(function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track', 'trackAgent'];for(w=0,x=v.length;w<x;++w)(function(m){
    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
})('ce39ba9f-1d40-40fa-8f60-56a9b38ecb05');
`}} />
      </head>
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
