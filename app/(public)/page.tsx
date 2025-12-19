"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
	const router = useRouter();

	return (
		<main className="min-h-screen flex items-center justify-center">
			<div className="space-y-4 text-center">
				<h1 className="text-3xl font-bold">Travel Article App</h1>

				<div className="flex gap-4 justify-center">
					<Button onClick={() => router.push("/articles")}>
						Masuk sebagai User
					</Button>

					<Button variant="outline" onClick={() => router.push("/login")}>
						Masuk sebagai Admin
					</Button>
				</div>
			</div>
		</main>
	);
}
