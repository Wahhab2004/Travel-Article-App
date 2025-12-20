"use client";

import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "@/lib/articles";
import { toastSuccess, toastError } from "@/lib/toast";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit3, Plus } from "lucide-react";

export default function ArticlesPage() {
	const [articles, setArticles] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchArticles = async () => {
		try {
			const res = await getArticles();
			setArticles(res.data.data);
		} catch {
			toastError("Gagal memuat artikel");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	const handleDelete = async (id: string) => {
		if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;

		try {
			await deleteArticle(id);
			toastSuccess("Artikel berhasil dihapus");
			fetchArticles();
		} catch {
			toastError("Gagal menghapus artikel");
		}
	};

	return (
		<div className="max-w-6xl mx-auto mt-10 px-4 pb-10">
			{/* Header Section */}
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Articles</h1>
					<p className="text-muted-foreground text-sm">
						Kelola semua konten artikel Anda di sini.
					</p>
				</div>
				<Link href="/articles/create">
					<Button className="gap-2">
						<Plus className="w-4 h-4" /> Tambah Artikel
					</Button>
				</Link>
			</div>

			{/* Grid Layout */}
			{isLoading ? (
				<p className="text-center py-10">Memuat data...</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{articles.map((item) => (
						<Card
							key={item.id}
							className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
						>
							{/* Image Container */}
							<div className="relative h-48 w-full bg-gray-200">
								<Image
									src={
										item.cover_image_url ||
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s"
									}
									alt={item.title}
									width={100}
									height={100}
									className="object-cover w-full h-full"
								/>
								<Badge
									className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white"
									variant="secondary"
								>
									{item.category?.name || "Uncategorized"}
								</Badge>
							</div>

							<CardHeader className="p-4 flex-grow">
								<h2 className="text-lg font-semibold line-clamp-2 leading-snug">
									{item.title}
								</h2>
							</CardHeader>

							<CardFooter className="p-4 pt-0 gap-2 border-t mt-4 bg-slate-50/50">
								<Link
									href={`/articles/${item.documentId}/edit`}
									className="flex-1"
								>
									<Button variant="outline" size="sm" className="w-full gap-2">
										<Edit3 className="w-4 h-4" /> Edit
									</Button>
								</Link>
								<Button
									variant="destructive"
									size="sm"
									className="gap-2"
									onClick={() => handleDelete(item.documentId)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}

			{articles.length === 0 && !isLoading && (
				<div className="text-center py-20 border-2 border-dashed rounded-xl">
					<p className="text-muted-foreground">
						Belum ada artikel yang dibuat.
					</p>
				</div>
			)}
		</div>
	);
}
