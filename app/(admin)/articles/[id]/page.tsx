"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getArticleBydocumentId } from "@/lib/articles";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticleDetailPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const [article, setArticle] = useState<any>(null);

	useEffect(() => {
		const fetchDetail = async () => {
			try {
				const res = await getArticleBydocumentId(id);
				setArticle(res.data.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchDetail();
	}, [id]);

	if (!article)
		return (
			<div className="p-10 text-center animate-pulse">
				Memuat detail artikel...
			</div>
		);

	return (
		<div className="max-w-4xl mx-auto py-10 px-6 animate-in fade-in duration-700 overflow-y-auto">
			<Button
				variant="ghost"
				onClick={() => router.back()}
				className="mb-6 rounded-xl gap-2 text-slate-500 hover:text-blue-600"
			>
				<ArrowLeft size={20} /> Kembali
			</Button>

			<div className="rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl bg-white">
				{article.cover_image_url && (
					<img
						src={article.cover_image_url}
						alt={article.title}
						className="w-full h-[400px] object-cover"
					/>
				)}

				<div className="p-8 md:p-12 space-y-6">
					<div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
						<span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full text-blue-600">
							<Tag size={14} /> {article.category?.name || "Travel"}
						</span>
						<span className="flex items-center gap-1.5 px-3 py-1.5 italic">
							<Calendar size={14} />{" "}
							{new Date(article.publishedAt).toLocaleDateString("id-ID")}
						</span>
					</div>

					<h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight italic">
						{article.title}
					</h1>

					<div className="prose prose-slate max-w-none">
						<p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
							{article.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
