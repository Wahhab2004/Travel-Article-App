"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/lib/categories";
import { toastSuccess, toastError } from "@/lib/toast";

export default function CreateCategoryPage() {
	const [name, setName] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await createCategory({ name });
			toastSuccess("Kategori berhasil dibuat");
			router.push("/categories");
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(apiError?.name || "Gagal membuat kategori", apiError?.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
			<h1 className="text-xl font-bold">Create Category</h1>

			<input
				placeholder="Category name"
				className="border p-2 w-full"
				onChange={(e) => setName(e.target.value)}
			/>

			<Button type="submit">Save</Button>
		</form>
	);
}
