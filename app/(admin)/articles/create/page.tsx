"use client";

import { useState } from "react";
import { createArticle } from "@/lib/articles";
import { toastSuccess, toastError } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/categories";
import { useEffect } from "react";

export default function CreateArticlePage() {
	const router = useRouter();

	const [categories, setCategories] = useState<any[]>([]);

	useEffect(() => {
		getCategories().then((res) => {
			setCategories(res.data.data);
		});
	}, []);

	const [form, setForm] = useState({
		title: "",
		description: "",
		cover_image_url: "",
		category: 1,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await createArticle(form);

			toastSuccess("Artikel berhasil dibuat");
			router.push("/articles");
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal membuat artikel", apiError?.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
			<h1 className="text-xl font-bold">Create Article</h1>

			<input
				placeholder="Title"
				className="border p-2 w-full"
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>

			<textarea
				placeholder="Description"
				className="border p-2 w-full"
				onChange={(e) => setForm({ ...form, description: e.target.value })}
			/>

			<input
				placeholder="Cover Image URL"
				className="border p-2 w-full"
				onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
			/>

			<select
				className="border p-2 w-full"
				value={form.category}
				onChange={(e) => setForm({ ...form, category: Number(e.target.value) })}
			>
				{categories.map((cat) => (
					<option key={cat.id} value={cat.id}>
						{cat.name}
					</option>
				))}
			</select>

			<Button type="submit">Save</Button>
		</form>
	);
}
