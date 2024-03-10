"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = Cookies.get("token");
        setAccessToken(token);
    }, []);

    const handleLogout = async () => {
        Cookies.remove("token");
        router.push("/signin");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const navItems = [
        { key: "1", label: "My Profile", href: "/profile" },
        { key: "2", label: "Incomplete Tasks", href: "/updateneeds" },
        { key: "3", label: "Block Timelog", href: "/weeklyschedule" },
        { key: "4", label: "Generated Routine", href: "/routine" },
    ];

    const navItems2 = [
        { key: "1", label: "Signup", href: "/signup" },
        { key: "2", label: "Signin", href: "/signin" },
    ];

    const pathname = usePathname();

    const isActive = (href) => pathname === href;

    return (
        <nav className="shadow-md sticky top-0 bg-white z-50 py-5">
            <div className="flex items-center justify-between px-10 max-w-screen-2xl mx-auto">
                <div className="flex items-center gap-3">
                    <span
                        className="text-xl font-bold cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        Study Planner
                    </span>
                </div>

                <div className="flex gap-5 items-center justify-between">
                    {(accessToken ? navItems : navItems2).map((item) => (
                        <span
                            key={item.key}
                            onClick={() => router.push(item.href)}
                            className={`cursor-pointer px-4 py-2 rounded-md text-md font-medium ${
                                isActive(item.href)
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-600 hover:bg-indigo-600 hover:text-white"
                            } transition duration-300`}
                        >
                            {item.label}
                        </span>
                    ))}
                    {accessToken && (
                        <span
                            onClick={handleLogout}
                            className="cursor-pointer bg-red-500 rounded-md px-4 py-2 text-white hover:bg-red-700 transition duration-300"
                        >
                            Signout
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
