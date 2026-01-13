import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata = {
  title: "Veron Vincent Rebello | Designer",
  description: "Portfolio of Veron Vincent Rebello",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} bg-[#FDFBF7] text-stone-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}