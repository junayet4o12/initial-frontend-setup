import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "../providers";
const inter = Inter({
  variable: "--font-inter",
  weight: ['100', '300', '200', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Overlanding outpost",
  description: "Buy sell explore",
};
import Container from "@/components/Global/Container";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} `}>
        <Providers>
          <Navbar />
          <Container className="w-full md:px-10 pt-24 lg:pt-40 min-h-[70vh] pb-20 flex justify-center items-center">

            <div className="flex justify-center items-center flex-col gap-5  min-h-full w-full">

              {children}
            </div>
            {/* Right Column: Promotional Section */}
           
          </Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}