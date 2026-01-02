"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/dashboard";
import { getArticles } from "@/lib/articles";
import { toastError } from "@/lib/toast";
// import { useAdminGuard } from "@/hooks/useProtectedRoute";
import { FileText, Layers, Eye, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
	const [stats, setStats] = useState<{ totalArticles: number } | null>(null);
	const [recentArticles, setRecentArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	// Tidak perlu pakai useAdminGuard? Karena sudah ada middleware
	// useAdminGuard();

	useEffect(() => {
		const fetchDashboardData = async () => {
			setLoading(true);
			try {
				const [statsRes, articlesRes] = await Promise.all([
					getDashboardStats(),
					getArticles(),
				]);

				setStats(statsRes);

				setRecentArticles(articlesRes.data.data.slice(0, 3));
			} catch (error) {
				toastError("Gagal memuat data dashboard");
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	return (
		<div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto px-6">
			{/* Header Section */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 tracking-tight">
						Selamat Datang, Admin!
					</h1>
					<p className="text-slate-500 mt-1">
						Berikut adalah ringkasan aktivitas{" "}
						<span className="text-xl text-blue-700 font-semibold italic">
							Tracle
						</span>{" "}
						hari ini.
					</p>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<StatCard
					label="Total Artikel"
					value={stats?.totalArticles}
					icon={<FileText className="text-blue-600" />}
					trend="+12% bulan ini"
				/>
				<StatCard
					label="Total Kategori"
					value={20}
					icon={<Layers className="text-purple-600" />}
					trend="Terorganisir"
				/>
				<StatCard
					label="Status Platform"
					value="Aktif"
					icon={<Eye className="text-emerald-600" />}
					trend="Server Sehat"
				/>
			</div>

			{/* Recent Articles Section */}
			<div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
				<div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
					<h2 className="text-xl font-bold text-slate-800">Artikel Terbaru</h2>
					<Link
						href="/articles"
						className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
					>
						Lihat semua <ArrowUpRight size={14} />
					</Link>
				</div>

				<div className="p-0">
					{loading ? (
						<div className="p-10 text-center text-slate-400">
							Memuat artikel...
						</div>
					) : recentArticles.length > 0 ? (
						<div className="divide-y divide-slate-100">
							{recentArticles.map((article) => {
								const data = article;
								return (
									<div
										key={article.id}
										className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors"
									>
										<div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
											{data.cover_image_url ? (
												<img
													src={data.cover_image_url}
													alt={data.title}
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] text-center p-1">
													Tanpa Gambar
												</div>
											)}
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="text-slate-900 font-bold truncate">
												{data.title}
											</h3>
											<p className="text-slate-500 text-sm truncate">
												{data.description || "Tidak ada deskripsi"}
											</p>
										</div>
										<div className="text-right">
											<span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
												{data.category?.name || "Tanpa Kategori"}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="p-10 text-center text-slate-400">
							Belum ada artikel yang diterbitkan.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// Reusable Stat Card Component
function StatCard({
	label,
	value,
	icon,
	trend,
}: {
	label: string;
	value: any;
	icon: React.ReactNode;
	trend: string;
}) {
	return (
		<div className="bg-white border border-slate-200 p-6 rounded-[32px] hover:border-blue-300 transition-all group shadow-sm">
			<div className="flex items-center justify-between mb-4">
				<div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-300">
					{icon}
				</div>
				<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
					{trend}
				</span>
			</div>
			<p className="text-sm text-slate-500 font-semibold">{label}</p>
			<p className="text-3xl font-bold text-slate-900 mt-1">
				{value !== null && value !== undefined ? value : "—"}
			</p>
		</div>
	);
}
