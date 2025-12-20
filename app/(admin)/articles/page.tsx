"use client";

import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "@/lib/articles";
import { toastSuccess, toastError } from "@/lib/toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Trash2,
	Edit3,
	Plus,
	Image as ImageIcon,
	FileText,
	Eye,
	Calendar,
} from "lucide-react";

export default function ArticlesPage() {
	const [articles, setArticles] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchArticles = async () => {
		setIsLoading(true);
		try {
			const res = await getArticles();
			setArticles(res.data.data);
		} catch {
			toastError("Gagal memuat artikel");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	const handleDelete = async (documentId: string) => {
		if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
		try {
			await deleteArticle(documentId);
			toastSuccess("Artikel berhasil dihapus");
			fetchArticles();
		} catch {
			toastError("Gagal menghapus artikel");
		}
	};

	return (
		/* Menghilangkan scroll utama dengan overflow-hidden dan h-screen */
		<div className="h-screen flex flex-col overflow-hidden -m-4 md:-m-10 bg-slate-50/30">
			{/* Header Tetap di Atas */}
			<div className="p-6 md:p-10 bg-white/50 backdrop-blur-md border-b border-slate-200/50">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-7xl mx-auto">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
							Daftar Artikel
						</h1>
						<p className="text-sm text-slate-500 mt-1">
							Kelola konten travel Tracle Anda.
						</p>
					</div>
					<Link href="/articles/create">
						<button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 cursor-pointer">
							<Plus size={20} /> Artikel Baru
						</button>
					</Link>
				</div>
			</div>

			{/* Scrollable Area: Hanya bagian ini yang bisa di-scroll secara vertikal */}
			<div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10 custom-scrollbar scroll-smooth">
				<div className="max-w-7xl mx-auto pb-20">
					{isLoading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{[1, 2, 3].map((n) => (
								<div
									key={n}
									className="h-[420px] rounded-[32px] bg-white animate-pulse shadow-sm border border-slate-100"
								/>
							))}
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{articles.map((item) => (
								<Card
									key={item.id}
									className="group border-slate-200 rounded-[32px] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 bg-white border shadow-sm"
								>
									<div className="relative h-52 w-full bg-slate-100 overflow-hidden">
										{item.cover_image_url ? (
											<img
												src={item.cover_image_url}
												alt={item.title}
												className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
											/>
										) : (
											<div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
												<ImageIcon size={40} />
											</div>
										)}

										<Badge className="absolute top-4 left-4 bg-white/95 text-blue-600 border-none font-bold px-4 py-1.5 rounded-full shadow-sm">
											{item.category?.name || "Uncategorized"}
										</Badge>
									</div>

									<CardHeader className="p-6 flex-grow">
										<div className="flex justify-between">
											<h2 className="text-xl font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors italic uppercase">
												{item.title}
											</h2>

											<span className="flex items-center gap-1.5 px-3 py-1.5 italic text-[12px] text-slate-400">
												<Calendar size={14} />{" "}
												{new Date(item.publishedAt).toLocaleDateString(
													"id-ID"
												)}
											</span>
										</div>
										{/* Menggunakan line-clamp pd desc agar tidak berantakan */}
										<p className="text-slate-800 text-sm line-clamp-3 leading-relaxed mb-4">
											{item.description || "Tidak ada deskripsi singkat."}
										</p>
										<Link href={`/articles/${item.documentId}`}>
											<span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
												LIHAT DETAIL ARTIKEL <Eye size={14} />
											</span>
										</Link>
									</CardHeader>

									<CardFooter className="p-6 pt-0 flex items-center gap-2">
										<Link
											href={`/articles/${item.documentId}/edit`}
											className="flex-1"
										>
											<Button
												variant="outline"
												className="w-full rounded-2xl border-slate-200 py-6 hover:bg-blue-50 font-bold gap-2"
											>
												<Edit3 className="w-4 h-4" /> Edit
											</Button>
										</Link>
										<Button
											variant="ghost"
											className="rounded-2xl p-6 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
											onClick={() => handleDelete(item.documentId)}
										>
											<Trash2 className="w-5 h-5" />
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>

			<style jsx global>{`
				/* Sembunyikan scrollbar horizontal permanen */
				body {
					overflow-x: hidden !important;
				}
				.custom-scrollbar::-webkit-scrollbar {
					width: 6px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: transparent;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: #e2e8f0;
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
}
