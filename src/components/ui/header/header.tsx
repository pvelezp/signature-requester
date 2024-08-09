"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Logo from "../../../../public/logo.svg";
import { useRouter } from "next/navigation";

const Header = ({
  action,
  title,
  isInitialPage,
}: {
  action?: ReactNode;
  title?: string;
  isInitialPage?: boolean;
}) => {
  const router = useRouter();

  return (
    <header className="flex justify-between p-6 bg-blue w-full">
      <div className="flex-none basis-1/4 sm:basis-1/3 flex justify-start">
        <div
          onClick={() => {
            if (isInitialPage) return;
            router.push("/dashboard");
          }}
        >
          <Image
            src={Logo}
            alt="logo-mobile"
            className="block sm:hidden logo"
            width={134}
            height={24}
          />
          <Image
            src={Logo}
            alt="logo-desktop"
            className="hidden sm:block logo"
            width={160}
            height={34}
          />
        </div>
      </div>

      <div className="flex flex-none basis-1/2  sm:basis-1/3 items-center justify-center">
        {title && (
          <h3 className="text-white m-0 font-bold flex text-center">{title}</h3>
        )}
      </div>

      <div className="flex-none basis-1/4 sm:basis-1/3 flex justify-end">
        {action}
      </div>
    </header>
  );
};

export default Header;
