"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCategories, deleteCategory } from "@/lib/categories";
import { toastSuccess, toastError } from "@/lib/toast";

export default function CategoriesPage() {
	const [categories, setCategories] = useState<any[]>([]);

	const fetchCategories = async () => {
		try {
			const res = await getCategories();
			setCategories(res.data.data);
		} catch {
			toastError("Gagal memuat kategori");
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
			const apiError = error?.response?.data?.error;
			toastError(
				apiError?.name || "Gagal menghapus kategori",
				apiError?.message
			);
		}
	};

	return (
		<div className="max-w-3xl mx-auto mt-10 space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold">Categories</h1>
				<Link href="/categories/create">
					<Button>Tambah</Button>
				</Link>
			</div>

			<table className="w-full border">
				<thead className="bg-gray-100">
					<tr>
						<th className="border p-2 text-left">Name</th>
						<th className="border p-2 w-40">Action</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((cat) => (
						<tr key={cat.documentId}>
							<td className="border p-2">{cat.name}</td>
							<td className="border p-2 space-x-2">
								<Link href={`/categories/${cat.documentId}/edit`}>
									<Button size="sm" variant="outline">
										Edit
									</Button>
								</Link>

								<Button
									size="sm"
									variant="destructive"
									onClick={() => handleDelete(cat.documentId)}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
