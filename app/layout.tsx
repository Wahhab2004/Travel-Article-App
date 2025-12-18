

import "@/styles/globals.css";
import { Providers } from "./providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-scree bg-background text-foreground antialiased"
      >
        {children}
      </body>
    </html>
  );
}
