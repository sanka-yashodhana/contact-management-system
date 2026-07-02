import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";


export const metadata: Metadata = {
  title: "Contact Manager",
  description: "A simple contact management application",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
