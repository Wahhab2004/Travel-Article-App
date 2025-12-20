"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import LogoutButton from "../LogoutButton";
import {
	LayoutDashboard,
	FileText,
	Tags,
	Compass,
	Menu,
	X,
} from "lucide-react";

const menus = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Articles", href: "/articles", icon: FileText },
	{ label: "Categories", href: "/categories", icon: Tags },
];

export default function AdminNavbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-[100] h-20">
			<div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
				{/* --- LOGO SECTION --- */}
				<div className="flex items-center gap-3">
					<div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
						<Compass className="text-white" size={24} />
					</div>
					<div className="hidden sm:block">
						<h1 className="font-bold text-slate-900 text-xl tracking-tight leading-none">
							Tracle
						</h1>
						<p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">
							Admin Panel
						</p>
					</div>
				</div>

				{/* --- DESKTOP MENU (Horizontal) --- */}
				<div className="hidden lg:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
					{menus.map((menu) => {
						const Icon = menu.icon;
						const isActive = pathname.startsWith(menu.href);

						return (
							<Link
								key={menu.href}
								href={menu.href}
								className={clsx(
									"flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold text-[14px]",
									isActive
										? "bg-white text-blue-600 shadow-sm border border-slate-100"
										: "text-slate-500 hover:text-slate-900"
								)}
							>
								<Icon size={18} />
								{menu.label}
							</Link>
						);
					})}
				</div>

				{/* --- LOGOUT & MOBILE TOGGLE --- */}
				<div className="flex items-center gap-4">
					<div className="hidden lg:block">
						<LogoutButton />
					</div>

					<button
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* --- MOBILE DROPDOWN MENU --- */}
			{isOpen && (
				<div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top duration-300">
					{menus.map((menu) => {
						const Icon = menu.icon;
						const isActive = pathname.startsWith(menu.href);
						return (
							<Link
								key={menu.href}
								href={menu.href}
								onClick={() => setIsOpen(false)}
								className={clsx(
									"flex items-center gap-4 px-5 py-4 rounded-2xl font-bold",
									isActive
										? "bg-blue-50 text-blue-600"
										: "text-slate-600 bg-slate-50"
								)}
							>
								<Icon size={20} />
								{menu.label}
							</Link>
						);
					})}
					<div className="mt-2 pt-4 border-t border-slate-100">
						<LogoutButton />
					</div>
				</div>
			)}
		</nav>
	);
}
