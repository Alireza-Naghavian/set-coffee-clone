import Link from "next/link";
import React from "react";
import styles from "./404.module.css";
function NotFound() {
  return (
    <>
      <div className="flex flex-col md:hidden mt-32">
        <header className={`${styles["page-header"]}`}></header>
        <h1 className="text-center font-Shabnam_B text-xl sm:text-2xl mt-12">
          صفحه ای که به دنبال آن هستید، موجود نیست.
        </h1>
        <Link
          className="text-main_brown text-center mt-6 font-Shabnam_B"
          href="/"
        >
          برگشت به صفحه اصلی
        </Link>
      </div>
      <main className="text-center space-y-6 mt-6 hidden md:flex  ">
        <div className="w-full">
          <div className={styles.contents}>
            <p className={styles.left_number}>4</p>
            <div className={styles.mug}></div>
            <p className={styles.right_number}>4</p>
          </div>
          <div className={styles.texts}>
            <p>صفحه مورد نظر یافت نشد :((</p>
            <Link className="text-main font-Shabnam_B" href="/">
              برگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFound;
