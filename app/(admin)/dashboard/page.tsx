"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/dashboard";
import { toastError } from "@/lib/toast";
import { useAdminGuard } from "@/hooks/useProtectedRoute";

export default function DashboardPage() {
	const [stats, setStats] = useState<{ totalArticles: number } | null>(null);
	useAdminGuard();

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const res = await getDashboardStats();
				setStats(res);
			} catch {
				toastError("Gagal memuat dashboard");
			}
		};

		fetchStats();
	}, []);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded border">
					<p className="text-sm text-gray-500">Total Articles</p>
					<p className="text-2xl font-bold">
						{stats ? stats.totalArticles : "—"}
					</p>
				</div>
			</div>
		</div>
	);
}
