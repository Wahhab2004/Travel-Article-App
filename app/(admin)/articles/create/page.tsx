"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, ArticleFormValues } from "@/schemas/article.schema";
import { createArticle } from "@/lib/articles";
import { toastSuccess, toastError } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/categories";
import { ArrowLeft, Image as ImageIcon, Save, Globe } from "lucide-react";
import Link from "next/link";

export default function CreateArticlePage() {
	const router = useRouter();
	const [categories, setCategories] = useState<any[]>([]);

	// Inisialisasi React Hook Form dengan Zod
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<ArticleFormValues>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: "",
			description: "",
			cover_image_url: "",
			category: "",
		},
	});

	const coverImageUrl = watch("cover_image_url");

	useEffect(() => {
		getCategories().then((res) => {
			const fetchedCats = res.data.data;
			setCategories(fetchedCats);

			if (fetchedCats.length > 0) {
				setValue("category", fetchedCats[0].id.toString());
			}
		});
	}, [setValue]);

	const onSubmit = async (data: ArticleFormValues) => {
		try {
			await createArticle(data);
			toastSuccess("Artikel berhasil diterbitkan");
			router.push("/articles");
			router.refresh();
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal membuat artikel", apiError?.message);
		}
	};

	return (
		<div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/articles">
						<button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
							<ArrowLeft size={20} />
						</button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold text-slate-900">
							Buat Artikel Baru
						</h1>
						<p className="text-sm text-slate-500">
							Tuliskan cerita perjalanan baru untuk komunitas Tracle.
						</p>
					</div>
				</div>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8"
			>
				{/* Main Form Area */}
				<div className="lg:col-span-2 space-y-6">
					<div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-5">
						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Judul Artikel
							</label>
							<input
								{...register("title")}
								placeholder="E.g. Menjelajahi Keindahan Tersembunyi di Labuan Bajo"
								className={`w-full bg-slate-50 border ${
									errors.title ? "border-red-500" : "border-slate-200"
								} rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
							/>
							{errors.title && (
								<p className="text-xs font-bold text-red-500 italic ml-1">
									{errors.title.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Deskripsi
							</label>
							<textarea
								{...register("description")}
								rows={4}
								placeholder="Berikan ringkasan menarik tentang artikel ini..."
								className={`w-full bg-slate-50 border ${
									errors.description ? "border-red-500" : "border-slate-200"
								} rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none`}
							/>
							{errors.description && (
								<p className="text-xs font-bold text-red-500 italic ml-1">
									{errors.description.message}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Sidebar Area */}
				<div className="space-y-6">
					<div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm space-y-5">
						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Kategori
							</label>
							<select
								{...register("category")}
								className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
							>
								<option value="">Pilih Kategori</option>
								{categories.map((cat) => (
									<option key={cat.documentId} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
							{errors.category && (
								<p className="text-xs font-bold text-red-500 italic ml-1">
									{errors.category.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								URL Cover Image
							</label>
							<div className="relative group">
								<input
									{...register("cover_image_url")}
									placeholder="https://images.unsplash.com/..."
									className={`w-full bg-slate-50 border ${
										errors.cover_image_url
											? "border-red-500"
											: "border-slate-200"
									} rounded-xl p-3 pl-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm`}
								/>
								<ImageIcon
									className="absolute left-3 top-3.5 text-slate-400"
									size={16}
								/>
							</div>
							{errors.cover_image_url && (
								<p className="text-xs font-bold text-red-500 italic ml-1">
									{errors.cover_image_url.message}
								</p>
							)}
						</div>

						{/* Image Preview Area */}
						<div className="mt-4 aspect-video rounded-2xl bg-slate-50 border border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
							{coverImageUrl ? (
								<img
									src={coverImageUrl}
									alt="Preview"
									className="w-full h-full object-cover"
									onError={(e) => (e.currentTarget.src = "")}
								/>
							) : (
								<div className="text-center p-4">
									<Globe size={24} className="mx-auto text-slate-300 mb-2" />
									<p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
										Preview Gambar
									</p>
								</div>
							)}
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 font-bold shadow-lg shadow-blue-100 flex items-center gap-2 transition-all"
						>
							{isSubmitting ? (
								"Menyimpan..."
							) : (
								<>
									<Save size={18} /> Simpan Artikel
								</>
							)}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
