"use client";

import { useEffect, useState } from "react";
import { getArticleBydocumentId, updateArticle } from "@/lib/articles";
import { useParams, useRouter } from "next/navigation";
import { toastSuccess, toastError } from "@/lib/toast";
import { Button } from "@/components/ui/button";

export default function EditArticlePage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();

	const [form, setForm] = useState({
		title: "",
		description: "",
		cover_image_url: "",
		category: 1,
	});
    
    
    


	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const res = await getArticleBydocumentId(id);
				const data = res.data.data;

				setForm({
					title: data.title || "",
					description: data.description || "",
					cover_image_url: data.cover_image_url || "",
					category: data.category?.data?.id || 1,
				});
			} catch {
				toastError("Gagal memuat artikel");
			}
		};

		fetchArticle();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await updateArticle(id, form);
			toastSuccess("Artikel berhasil diperbarui");
			router.push("/articles");
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal update artikel", apiError?.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
			<h1 className="text-xl font-bold">Edit Article</h1>

			<input
				placeholder="Title"
				className="border p-2 w-full"
				value={form.title}
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>

			<textarea
				placeholder="Description"
				className="border p-2 w-full"
				value={form.description}
				onChange={(e) => setForm({ ...form, description: e.target.value })}
			/>

			<input
				placeholder="Cover Image URL"
				className="border p-2 w-full"
				value={form.cover_image_url}
				onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
			/>

			<input
				type="number"
				placeholder="Category ID"
				className="border p-2 w-full"
				value={form.category}
				onChange={(e) => setForm({ ...form, category: Number(e.target.value) })}
			/>

			<Button type="submit">Update</Button>
		</form>
	);
}
