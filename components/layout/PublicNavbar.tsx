"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicNavbar() {
	return (
		<nav className="border-b">
			<div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
				<Link href="/" className="font-bold text-lg">
					MyApp
				</Link>

				<div className="space-x-4">
					<Link href="/articles">Articles</Link>
					<Link href="/login">
						<Button size="sm">Login</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
