import type { Metadata } from "next";
import "./globals.css";
import NavBarLayout from "@/components/Shared-components/NavBar/NavBarLayout";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body >
        <NavBarLayout/>
        {children}
        </body>
    </html>
  );
}
