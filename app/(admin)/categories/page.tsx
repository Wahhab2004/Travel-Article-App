"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCategories, deleteCategory } from "@/lib/categories";
import { toastSuccess, toastError } from "@/lib/toast";
import {
	Plus,
	Hash,
	Trash2,
	Edit3,
	Shapes,
	Search,
	ChevronRight,
	Tag,
} from "lucide-react";

export default function CategoriesPage() {
	const [categories, setCategories] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchCategories = async () => {
		setIsLoading(true);
		try {
			const res = await getCategories();
			setCategories(res.data.data);
		} catch {
			toastError("Gagal memuat kategori");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleDelete = async (id: string) => {
		if (!confirm("Hapus kategori ini?")) return;
		try {
			await deleteCategory(id);
			toastSuccess("Kategori berhasil dihapus");
			fetchCategories();
		} catch (error: any) {
			toastError("Gagal menghapus kategori");
		}
	};

	const filteredCategories = categories.filter((cat) =>
		cat.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
			{/* HEADER */}
			<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-200 pb-10">
				<div>
					<div className="flex items-center gap-3 text-blue-600 mb-3">
						<Shapes size={20} strokeWidth={2.5} />
						<span className="text-xs font-bold uppercase tracking-[0.3em]">
							Inventory
						</span>
					</div>
					<h1 className="text-4xl font-black text-slate-900 tracking-tight">
						Kategori <span className="text-blue-600">Wisata</span>
					</h1>
					<p className="text-slate-500 mt-2 font-medium">
						Atur klasifikasi destinasi untuk memudahkan navigasi pengguna.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row items-center gap-4">
					<div className="relative group w-full sm:w-72">
						<Search
							className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
							size={18}
						/>
						<input
							type="text"
							placeholder="Cari kategori..."
							className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Link href="/categories/create" className="w-full sm:w-auto">
						<Button className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-2xl px-8 py-7 shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-bold italic">
							<Plus className="mr-2" size={20} strokeWidth={3} /> Tambah Kategori
						</Button>
					</Link>
				</div>
			</div>

			{/* --- COMPACT LIST GRID --- */}
			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div
							key={i}
							className="h-24 bg-slate-100 rounded-3xl animate-pulse"
						/>
					))}
				</div>
			) : filteredCategories.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{filteredCategories.map((cat) => (
						<div
							key={cat.documentId}
							className="group relative flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[24px] hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
						>
							{/* Decorative Background Element */}
							<div className="absolute -right-4 -bottom-4 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity rotate-12">
								<Tag size={80} strokeWidth={1} />
							</div>

							<div className="flex items-center gap-4 relative z-10">
								<div className="flex items-center justify-center w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
									<Hash size={24} strokeWidth={2.5} />
								</div>
								<div>
									<h3 className="font-black text-slate-800 text-lg leading-tight group-hover:text-blue-700 transition-colors">
										{cat.name}
									</h3>
									<p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
										{cat.documentId.slice(0, 8)}
									</p>
								</div>
							</div>

							<div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 relative z-10">
								<Link href={`/categories/${cat.documentId}/edit`}>
									<button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100">
										<Edit3 size={16} />
									</button>
								</Link>
								<button
									onClick={() => handleDelete(cat.documentId)}
									className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
								>
									<Trash2 size={16} />
								</button>
							</div>

							{/* Chevron indicator for mobile hint */}
							<ChevronRight
								size={18}
								className="text-slate-300 group-hover:hidden"
							/>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-24 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
					<div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-slate-300">
						<Tag size={32} />
					</div>
					<h3 className="text-xl font-black text-slate-900 uppercase">
						Kategori tidak ditemukan
					</h3>
					<p className="text-slate-500 max-w-xs mx-auto mt-2">
						Belum ada kategori yang dibuat atau pencarian tidak cocok.
					</p>
				</div>
			)}
		</div>
	);
}
