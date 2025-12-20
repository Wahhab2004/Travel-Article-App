"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, ArticleFormValues } from "@/schemas/article.schema";
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
	const [fetching, setFetching] = useState(true);

	// 1. Inisialisasi React Hook Form
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ArticleFormValues>({
		resolver: zodResolver(articleSchema),
	});

	const coverImageUrl = watch("cover_image_url");

	// Fetch Kategori
	useEffect(() => {
		getCategories().then((res) => {
			setCategories(res.data.data);
		});
	}, []);

	// 2. Fetch Data Artikel & Masukkan ke Form
	useEffect(() => {
		const fetchArticle = async () => {
			setFetching(true);
			try {
				const res = await getArticleBydocumentId(id);
				const data = res.data.data;

				// Mengisi nilai default form menggunakan reset() dari react-hook-form
				reset({
					title: data.title || "",
					description: data.description || "",
					cover_image_url: data.cover_image_url || "",
					category: data.category?.id || "",
				});
			} catch (error) {
				toastError("Gagal memuat artikel");
			} finally {
				setFetching(false);
			}
		};

		if (id) fetchArticle();
	}, [id, reset]);

	// 3. Handler Update
	const onSubmit = async (data: ArticleFormValues) => {
		try {
			const payload = {
				...data,
				category: Number(data.category),
			};

			await updateArticle(id, payload);
			toastSuccess("Artikel berhasil diperbarui");
			router.push("/articles");
			router.refresh();
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal update artikel", apiError?.message);
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
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/articles">
						<button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 text-black">
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
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8"
			>
				{/* Bagian Utama */}
				<div className="lg:col-span-2 space-y-6">
					<div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Judul Artikel
							</label>
							<input
								{...register("title")}
								placeholder="E.g. Keajaiban Alam di Dieng"
								className={`w-full bg-slate-50 border ${
									errors.title ? "border-red-500" : "border-slate-200"
								} rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium`}
							/>
							{errors.title && (
								<p className="text-xs text-red-500 font-bold italic ml-1">
									{errors.title.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Deskripsi Artikel
							</label>
							<textarea
								{...register("description")}
								rows={6}
								placeholder="Tuliskan detail perjalanan..."
								className={`w-full bg-slate-50 border ${
									errors.description ? "border-red-500" : "border-slate-200"
								} rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none`}
							/>
							{errors.description && (
								<p className="text-xs text-red-500 font-bold italic ml-1">
									{errors.description.message}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm space-y-5">
						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								Kategori
							</label>
							<select
								{...register("category")}
								className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none cursor-pointer"
							>
								<option value="">Pilih Kategori</option>
								{categories.map((cat) => (
									<option key={cat.id} value={cat.id.toString()}>
										{cat.attributes?.name || cat.name}
									</option>
								))}
							</select>
							{errors.category && (
								<p className="text-xs text-red-500 font-bold italic ml-1">
									{errors.category.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1">
								URL Cover Image
							</label>
							<div className="relative">
								<input
									{...register("cover_image_url")}
									placeholder="https://..."
									className={`w-full bg-slate-50 border ${
										errors.cover_image_url
											? "border-red-500"
											: "border-slate-200"
									} rounded-xl p-3 pl-10 text-slate-900 text-sm`}
								/>
								<ImageIcon
									className="absolute left-3 top-3.5 text-slate-400"
									size={16}
								/>
							</div>
							{errors.cover_image_url && (
								<p className="text-xs text-red-500 font-bold italic ml-1">
									{errors.cover_image_url.message}
								</p>
							)}
						</div>

						{/* Preview */}
						<div className="aspect-video rounded-2xl bg-slate-50 border border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
							{coverImageUrl ? (
								<img
									src={coverImageUrl}
									alt="Preview"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="text-center text-slate-300">
									<Globe size={24} className="mx-auto mb-1" />
									<p className="text-[10px] font-bold uppercase tracking-wider">
										Image Preview
									</p>
								</div>
							)}
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 font-bold shadow-lg shadow-blue-100 flex items-center gap-2"
						>
							{isSubmitting ? (
								<Loader2 className="animate-spin" size={18} />
							) : (
								<Save size={18} />
							)}
							Simpan Perubahan
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
