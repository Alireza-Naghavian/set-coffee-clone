'use client' 
import Link from "next/link";
import React from "react";
function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2 className="text-main_brown text-2xl font-Shabnam_B">
          عملیات با خطا مواجه شد!
            <span>{error.message}</span>
        </h2>
        <Link href={"/"}>صفحه اصلی</Link>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

export default error;
