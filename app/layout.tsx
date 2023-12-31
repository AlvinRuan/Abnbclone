import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/navbar/RegisterModal";

import { Nunito } from "next/font/google";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
