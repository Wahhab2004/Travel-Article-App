"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import LogoutButton from "../LogoutButton";

const menus = [
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Articles", href: "/articles" },
];

export default function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 border-r min-h-screen p-4 flex flex-col">
			<div className="font-bold text-lg mb-6">Admin Panel</div>

			<nav className="space-y-2 flex-1">
				{menus.map((menu) => (
					<Link
						key={menu.href}
						href={menu.href}
						className={clsx(
							"block px-3 py-2 rounded",
							pathname === menu.href
								? "bg-gray-200 font-medium"
								: "hover:bg-gray-100"
						)}
					>
						{menu.label}
					</Link>
				))}
			</nav>

			<LogoutButton />
		</aside>
	);
}
