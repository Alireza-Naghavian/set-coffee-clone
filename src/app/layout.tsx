import Footer from "@/components/Shared-components/Footer/Footer";
import NavBarLayout from "@/components/Shared-components/NavBar/NavBarLayout";
import ScrollToTop from "@/utils/ScrollToTop/ScrollToTop";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "فروشگاه قهوه ست| SET Coffee",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
  icons: "/images/favicon.png",
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="relative font-Shabnam">
        <NavBarLayout />
       {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
