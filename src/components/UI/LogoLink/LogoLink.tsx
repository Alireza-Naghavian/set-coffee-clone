import Image from "next/image";
import Link from "next/link";
import React from "react";

function LogoLink() {
  return (
    <Link href={"/"} className="
     flex-center mx-auto my-auto">
      <Image
        quality={75}
        width={171}
        height={63}
        priority={true}
        src="/images/logo.png"
        className="object-cover "
        alt="set coffee"
      />
    </Link>
  );
}

export default LogoLink;
