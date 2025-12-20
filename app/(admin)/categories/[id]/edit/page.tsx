"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCategoryById, updateCategory } from "@/lib/categories";
import { toastSuccess, toastError } from "@/lib/toast";
import { ArrowLeft, Tags, Save } from "lucide-react";
import Link from "next/link";

export default function EditCategoryPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const res = await getCategoryById(id);
				// Menyesuaikan jika data Strapi dibungkus dalam .attributes
				const categoryData = res.data.data.attributes || res.data.data;
				setName(categoryData.name);
			} catch {
				toastError("Gagal memuat kategori");
			} finally {
				setIsFetching(false);
			}
		};

		fetchCategory();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await updateCategory(id, { name });
			toastSuccess("Kategori berhasil diperbarui");
			router.push("/categories");
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal update kategori", apiError?.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Link href="/categories">
					<button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
						<ArrowLeft size={20} />
					</button>
				</Link>
				<div>
					<h1 className="text-2xl font-bold text-slate-900">Edit Kategori</h1>
					<p className="text-sm text-slate-500">
						Sesuaikan nama kategori agar konten Tracle tetap rapi.
					</p>
				</div>
			</div>

			{/* Form Card */}
			<div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
				{isFetching ? (
					<div className="space-y-4 animate-pulse">
						<div className="h-4 w-24 bg-slate-100 rounded" />
						<div className="h-12 w-full bg-slate-100 rounded-xl" />
						<div className="h-10 w-32 bg-slate-100 rounded-xl ml-auto" />
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
								<Tags size={16} className="text-blue-600" />
								Nama Kategori
							</label>
							<input
								required
								placeholder="E.g. Wisata Alam, Kuliner, Budaya"
								className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="flex justify-end pt-2">
							<Button
								type="submit"
								disabled={isLoading}
								className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-6 font-bold shadow-lg shadow-blue-100 flex items-center gap-2 transition-all"
							>
								{isLoading ? (
									"Menyimpan..."
								) : (
									<>
										<Save size={18} /> Simpan Perubahan
									</>
								)}
							</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
