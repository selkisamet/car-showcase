import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CustomButton } from ".";

const Navbar = () => {
    return (
        <header className="w-full absolute z-10">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center">
                <Link href="/" className="flex justify-center items-center sm:px-16 px-6 py-6">
                    <Image src="/logo.svg" className="object-contain" height={18} width={118} alt="logo" />
                </Link>

                <CustomButton title="Sign In" btnType="button" containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]" />
            </nav>
        </header>
    )
}

export default Navbar;