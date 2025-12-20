"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import LogoutButton from "../LogoutButton";
import {
	LayoutDashboard,
	FileText,
	Tags,
	Compass,
	PlusCircle,
	PencilLine,
} from "lucide-react";

const menus = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Articles", href: "/articles", icon: FileText },
	{ label: "Categories", href: "/categories", icon: Tags },
];

export default function AdminSidebar() {
	const pathname = usePathname();

	// Logika untuk mendeteksi status halaman artikel
	const isAddingArticle = pathname === "/articles/create";
	const isEditingArticle =
		pathname.includes("/edit") && pathname.includes("/articles");

	// Tambahkan ini di dalam AdminSidebar untuk mendeteksi kategori
	const isAddingCategory = pathname === "/categories/create";
	const isEditingCategory =
		pathname.includes("/edit") && pathname.includes("/categories");

	return (
		<aside className="w-72 bg-white border-r border-slate-200 min-h-screen p-6 flex flex-col relative">
			{/* Logo Section */}
			<div className="flex items-center gap-3 mb-10 px-2">
				<div className="bg-blue-600 p-2 rounded-xl shadow-md shadow-blue-200">
					<Compass className="text-white" size={24} />
				</div>
				<div>
					<h1 className="font-bold text-slate-900 text-xl tracking-tight">
						Tracle
					</h1>
					<p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] leading-none">
						Admin Panel
					</p>
				</div>
			</div>

			{/* Navigation Section */}
			<nav className="space-y-1 flex-1">
				<p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-4 px-3">
					Menu Utama
				</p>
				{menus.map((menu) => {
					const Icon = menu.icon;
					// Articles tetap dianggap aktif jika sedang di halaman create/edit
					const isActive = pathname.startsWith(menu.href);

					return (
						<div key={menu.href} className="space-y-1">
							<Link
								href={menu.href}
								className={clsx(
									"group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
									isActive
										? "bg-blue-50 text-blue-600 border border-blue-100"
										: "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
								)}
							>
								<Icon
									size={20}
									className={clsx(
										"transition-colors",
										isActive
											? "text-blue-600"
											: "text-slate-400 group-hover:text-slate-600"
									)}
								/>
								<span className="font-semibold text-[15px]">{menu.label}</span>

								{isActive && !isAddingArticle && !isEditingArticle && (
									<div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
								)}
							</Link>
							{/* Status Sub-menu untuk Articles */}
							{menu.label === "Articles" &&
								(isAddingArticle || isEditingArticle) && (
									<div className="ml-9 pl-4 border-l-2 border-blue-100 py-1 space-y-1 animate-in slide-in-from-left-2 duration-300">
										<div className="flex items-center gap-2 text-[13px] font-medium text-blue-500">
											{isAddingArticle ? (
												<>
													<PlusCircle size={14} />
													<span>Tambah Artikel Baru</span>
												</>
											) : (
												<>
													<PencilLine size={14} />
													<span>Edit Artikel</span>
												</>
											)}
										</div>
									</div>
								)}
							{/* Status Sub-menu untuk Categories */}{" "}
							{menu.label === "Categories" &&
								(isAddingCategory || isEditingCategory) && (
									<div className="ml-9 pl-4 border-l-2 border-blue-100 py-1 space-y-1 animate-in slide-in-from-left-2 duration-300">
										<div className="flex items-center gap-2 text-[13px] font-medium text-blue-500">
											{isAddingCategory ? (
												<>
													<PlusCircle size={14} />
													<span>Tambah Kategori Baru</span>
												</>
											) : (
												<>
													<PencilLine size={14} />
													<span>Edit Kategori</span>
												</>
											)}
										</div>
									</div>
								)}
						</div>
					);
				})}
			</nav>

			<LogoutButton />
		</aside>
	);
}
