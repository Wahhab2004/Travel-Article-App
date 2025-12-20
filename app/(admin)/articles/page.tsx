"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getArticles, deleteArticle } from "@/lib/articles";
import { getCategories } from "@/lib/categories";
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
	Eye,
	Calendar,
	Search,
	Newspaper,
	Filter,
	Inbox,
} from "lucide-react";

export default function ArticlesPage() {
	const [articles, setArticles] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// States Filter & Pagination
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const observer = useRef<IntersectionObserver | null>(null);

	// Mengambil Kategori untuk Filter
	useEffect(() => {
		const fetchCats = async () => {
			try {
				const res = await getCategories();
				setCategories(res.data.data);
			} catch (err) {
				console.error("Gagal mengambil kategori:", err);
			}
		};
		fetchCats();
	}, []);

	const fetchArticlesData = useCallback(
		async (pageNum: number, isNewSearch = false) => {
			setIsLoading(true);
			try {
				const res = await getArticles(pageNum, 9, searchTerm, selectedCategory);
				const newArticles = res.data.data;

				if (isNewSearch) {
					setArticles(newArticles);
				} else {
					setArticles((prev) => [...prev, ...newArticles]);
				}

				// Jika data yang datang kurang dari pageSize (9), berarti sudah habis
				setHasMore(newArticles.length === 9);
			} catch {
				toastError("Gagal memuat artikel");
			} finally {
				setIsLoading(false);
			}
		},
		[searchTerm, selectedCategory]
	);

	// Meriset dan mengambil ulang data saat filter berubah
	useEffect(() => {
		setPage(1);
		fetchArticlesData(1, true);
	}, [searchTerm, selectedCategory, fetchArticlesData]);

	// Infinite Scroll Observer
	const lastElementRef = useCallback(
		(node: any) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prev) => prev + 1);
					fetchArticlesData(page + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore, page, fetchArticlesData]
	);

	const handleDelete = async (documentId: string) => {
		if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
		try {
			await deleteArticle(documentId);
			toastSuccess("Artikel berhasil dihapus");
			setArticles((prev) => prev.filter((a) => a.documentId !== documentId));
		} catch {
			toastError("Gagal menghapus artikel");
		}
	};

	return (
		<div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
			{/* Header */}
			<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-200 pb-10">
				<div>
					<div className="flex items-center gap-3 text-blue-600 mb-3">
						<Newspaper size={20} strokeWidth={2.5} />
						<span className="text-xs font-bold uppercase tracking-[0.3em]">
							Redaksi Tracle
						</span>
					</div>
					<h1 className="text-4xl font-black text-slate-900 tracking-tight">
						Daftar <span className="text-blue-600">Artikel</span>
					</h1>
					<p className="text-slate-500 mt-2 font-medium">
						Kelola cerita perjalanan dan konten komunitas Tracle Anda.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
					{/* Pencarian */}
					<div className="relative group w-full sm:w-64">
						<Search
							className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
							size={18}
						/>
						<input
							type="text"
							placeholder="Cari artikel..."
							className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					{/* Filter Kategori */}
					<div className="relative w-full sm:w-48">
						<Filter
							className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
							size={16}
						/>
						<select
							className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm appearance-none outline-none focus:ring-4 focus:ring-blue-50 cursor-pointer"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							<option value="">Semua Kategori</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.name}>
									{cat.name}
								</option>
							))}
						</select>
					</div>

					<Link href="/articles/create" className="w-full sm:w-auto">
						<Button className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-2xl px-8 py-7 shadow-xl transition-all duration-300 font-bold italic">
							<Plus className="mr-2" size={20} strokeWidth={3} /> TAMBAH ARTIKEL
						</Button>
					</Link>
				</div>
			</div>

			{/* Kondisi Data Tidak Ditemukan */}
			{!isLoading && articles.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-24 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
					<div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6">
						<Inbox size={40} className="text-slate-300" />
					</div>
					<h3 className="text-xl font-bold text-slate-900 mb-2">
						Artikel Tidak Ditemukan
					</h3>
					<p className="text-slate-500 max-w-xs mx-auto">
						Maaf, kami tidak menemukan artikel yang sesuai dengan kriteria
						pencarian atau kategori Anda.
					</p>
					<Button
						variant="link"
						className="mt-4 text-blue-600 font-bold"
						onClick={() => {
							setSearchTerm("");
							setSelectedCategory("");
						}}
					>
						Atur Ulang Filter
					</Button>
				</div>
			) : (
				/* Grid Artikel */
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
					{articles.map((item, index) => (
						<Card
							key={item.documentId}
							ref={index === articles.length - 1 ? lastElementRef : null}
							className="group border-slate-200 rounded-[40px] overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white border shadow-sm"
						>
							<div className="relative h-64 w-full bg-slate-100 overflow-hidden">
								{item.cover_image_url ? (
									<img
										src={item.cover_image_url}
										alt={item.title}
										className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
									/>
								) : (
									<div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
										<ImageIcon size={48} strokeWidth={1} />
									</div>
								)}
								<Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-blue-600 border-none font-bold px-5 py-2 rounded-2xl shadow-sm">
									{item.category?.name || "Tanpa Kategori"}
								</Badge>
							</div>

							<CardHeader className="p-8 flex-grow">
								<div className="flex justify-between items-start mb-4">
									<span className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
										<Calendar size={14} className="text-blue-500" />
										{new Date(item.publishedAt).toLocaleDateString("id-ID", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</span>
								</div>

								<h2 className="text-2xl font-black text-slate-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
									{item.title}
								</h2>

								<p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
									{item.description ||
										"Mari jelajahi keindahan destinasi ini lebih dalam bersama komunitas Tracle."}
								</p>

								<Link
									href={`/articles/${item.documentId}`}
									className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:gap-4 transition-all uppercase tracking-tighter"
								>
									Selengkapnya <Eye size={16} />
								</Link>
							</CardHeader>

							<CardFooter className="p-8 pt-0 flex items-center gap-3">
								<Link
									href={`/articles/${item.documentId}/edit`}
									className="flex-1"
								>
									<Button
										variant="outline"
										className="w-full rounded-2xl border-slate-100 py-6 hover:bg-blue-50 hover:text-blue-600 font-bold transition-all"
									>
										<Edit3 className="w-4 h-4 mr-2" /> Edit
									</Button>
								</Link>
								<Button
									variant="ghost"
									className="rounded-2xl p-6 text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all"
									onClick={() => handleDelete(item.documentId)}
								>
									<Trash2 className="w-5 h-5" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}

			{/* Indikator Pemuatan saat Scroll */}
			{isLoading && (
				<div className="flex justify-center pb-20">
					<div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}

			{/* Akhir Daftar */}
			{!hasMore && articles.length > 0 && !isLoading && (
				<div className="text-center pb-20 text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">
					✨ Semua artikel telah ditampilkan
				</div>
			)}
		</div>
	);
}
