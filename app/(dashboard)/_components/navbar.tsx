"use client"

import { UserButton } from "@clerk/nextjs"

export const Navbar = () => {
    return (
        <header className="flex items-center gap-x-4 p-5 bg-[#9f84ff]/50">
            Navbar
            <div className="hidden lg:flex lg:flex-1 bg-yellow-400/60">
                Search
            </div>
            <UserButton />
        </header>
    )
}