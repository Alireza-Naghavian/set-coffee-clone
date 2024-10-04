import Footer from "@/components/Shared-components/Footer/Footer";
import NavBarLayout from "@/components/Shared-components/NavBar/NavBarLayout";
import ScrollToTop from "@/utils/ScrollToTop/ScrollToTop";
import type { Metadata } from "next";
import "./globals.css";
import InstallBanner from "@/utils/InstallPwaBanner/InstallBanner";

export const metadata: Metadata = {
  applicationName: "قهوه ست",
  title: "فروشگاه قهوه ست| SET Coffee",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",

  manifest: "/manifest.json",
  icons: {
    apple: [
      {
        url: "/icons/apple-touch-touch-icon.png",
        sizes: "76x76",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/apple-touch-icon-57x57.png",
        sizes: "57x57",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/apple-touch-icon-60x60.png",
        sizes: "60x60",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/apple-touch-icon-72x72.png",
        sizes: "72x72",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/apple-touch-icon-76x76.png",
        sizes: "76x76",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/apple-touch-icon-114x114.png",
        sizes: "114x114",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/apple-touch-icon-120x120.png",
        sizes: "120x120",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/apple-touch-icon-144x144.png",
        sizes: "144x144",
        rel: "apple-touch-icon",
      },
      {
        url: "/icons/mstile-150x150.png",
        sizes: "150x150",
        rel: "ms-icon",
      },
      {
        url: "/icons/mstile-144x144.png",
        sizes: "144x144",
        rel: "ms-icon",
      },
    ],

    icon: [
      { url: "/icons/favicon.ico", sizes: "96x96 32x32 16x16", type: "image/x-icon" },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "قهوه ست",
    title: "فروشگاه قهوه ست| SET Coffee",
    description:
      "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
  },
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
        <InstallBanner/>
        <Footer />
      </body>
    </html>
  );
}
