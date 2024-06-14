import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { DefaultProvider } from "../components/default-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const roboto = Roboto({ 
  weight: ['300','400','500','700','900'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Alura Flix",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <DefaultProvider>
          <Header/>
          {children}
          <Footer/>
        </DefaultProvider>
        </body>
    </html>
  );
}
