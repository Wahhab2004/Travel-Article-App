"use client";

import { useEffect, useState } from "react";
import { getArticleBydocumentId, updateArticle } from "@/lib/articles";
import { useParams, useRouter } from "next/navigation";
import { toastSuccess, toastError } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/categories";
import {
	ArrowLeft,
	Image as ImageIcon,
	Save,
	Globe,
	Loader2,
} from "lucide-react";
import Link from "next/link";

export default function EditArticlePage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();

	const [categories, setCategories] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(true);

	const [form, setForm] = useState({
		title: "",
		description: "",
		cover_image_url: "",
		category: 1,
	});


	useEffect(() => {
		getCategories().then((res) => {
			setCategories(res.data.data);
		});
	}, []);


	useEffect(() => {
		const fetchArticle = async () => {
			setFetching(true);
			try {
				const res = await getArticleBydocumentId(id);
			
				const data = res.data.data || res.data.data;

				setForm({
					title: data.title || "",
					description: data.description || "",
					cover_image_url: data.cover_image_url || "",
					category: data.category?.data?.id || 1,
				});
			} catch {
				toastError("Gagal memuat artikel");
			} finally {
				setFetching(false);
			}
		};

		fetchArticle();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await updateArticle(id, form);
			toastSuccess("Artikel berhasil diperbarui");
			router.push("/articles");
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal update artikel", apiError?.message);
		} finally {
			setLoading(false);
		}
	};

	if (fetching) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
				<Loader2 className="w-8 h-8 animate-spin mb-2" />
				<p className="font-medium">Mengambil data artikel...</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/articles">
						<button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
							<ArrowLeft size={20} />
						</button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold text-slate-900">Edit Artikel</h1>
						<p className="text-sm text-slate-500">
							Perbarui detail petualangan di Tracle.
						</p>
					</div>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black"
			>
				{/* Bagian Utama Form */}
				<div className="lg:col-span-2 space-y-6">
					<div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Judul Artikel
							</label>
							<input
								required
								value={form.title}
								placeholder="E.g. Keajaiban Alam di Dieng"
								className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
								onChange={(e) => setForm({ ...form, title: e.target.value })}
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Deskripsi Artikel
							</label>
							<textarea
								required
								rows={6}
								value={form.description}
								placeholder="Tuliskan detail perjalanan..."
								className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
								onChange={(e) =>
									setForm({ ...form, description: e.target.value })
								}
							/>
						</div>
					</div>
				</div>

				{/* Sidebar Metadata */}
				<div className="space-y-6 text-black">
					<div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm space-y-5">
						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Kategori
							</label>
							<select
								className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
								value={form.category}
								onChange={(e) =>
									setForm({ ...form, category: Number(e.target.value) })
								}
							>
								{categories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat?.name || cat.name}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								URL Cover Image
							</label>
							<div className="relative">
								<input
									value={form.cover_image_url}
									placeholder="https://..."
									className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
									onChange={(e) =>
										setForm({ ...form, cover_image_url: e.target.value })
									}
								/>
								<ImageIcon
									className="absolute left-3 top-3.5 text-slate-400"
									size={16}
								/>
							</div>
						</div>

						{/* Preview Image */}
						<div className="aspect-video rounded-2xl bg-slate-50 border border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
							{form.cover_image_url ? (
								<img
									src={form.cover_image_url}
									alt="Preview"
									className="w-full h-full object-cover"
									onError={(e) => (e.currentTarget.src = "")}
								/>
							) : (
								<div className="text-center">
									<Globe size={24} className="mx-auto text-slate-300 mb-1" />
									<p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
										Image Preview
									</p>
								</div>
							)}
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 font-bold shadow-lg shadow-blue-100 flex items-center gap-2 transition-all"
						>
							{loading ? (
								"Menyimpan..."
							) : (
								<>
									<Save size={18} /> Perbarui Artikel
								</>
							)}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
