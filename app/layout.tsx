import "@/styles/globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-scree bg-background text-foreground antialiased">
				<Providers>{children}</Providers>
				<Toaster position="top-right" richColors/>
			</body>
		</html>
	);
}
