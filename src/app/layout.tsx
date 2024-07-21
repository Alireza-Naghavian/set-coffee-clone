import Footer from "@/components/Shared-components/Footer/Footer";
import NavBarLayout from "@/components/Shared-components/NavBar/NavBarLayout";
import ScrollToTop from "@/utils/ScrollToTop/ScrollToTop";
import type { Metadata } from "next";
import "./globals.css";
import { getUser } from "@/utils/auth/authHelper";
import dataParser from "@/utils/dataParser/dataParser";
import { GetMetype } from "@/types/auth.type";

export const metadata: Metadata = {
  title: "فروشگاه قهوه ست| SET Coffee",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
  icons: "/images/favicon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user :GetMetype = await getUser();
  return (
    <html lang="fa" dir="rtl">
      <body className="relative font-Shabnam">
        <NavBarLayout user={user && dataParser(user)} />
       {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
