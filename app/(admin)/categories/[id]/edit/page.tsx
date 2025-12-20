"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCategoryById, updateCategory } from "@/lib/categories";
import { toastSuccess, toastError } from "@/lib/toast";

export default function EditCategoryPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const [name, setName] = useState("");

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const res = await getCategoryById(id);
				setName(res.data.data.name);
			} catch {
				toastError("Gagal memuat kategori");
			}
		};

		fetchCategory();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await updateCategory(id, { name });
			toastSuccess("Kategori berhasil diperbarui");
			router.push("/categories");
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal update kategori", apiError?.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
			<h1 className="text-xl font-bold">Edit Category</h1>

			<input
				placeholder="Category name"
				className="border p-2 w-full"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<Button type="submit">Update</Button>
		</form>
	);
}
