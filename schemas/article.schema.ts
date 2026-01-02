import { z } from "zod";

// Validasi menggunakan Zod
export const articleSchema = z.object({
	title: z
		.string()
		.min(10, "Judul minimal harus 10 karakter")
		.max(100, "Judul maksimal 100 karakter"),

	description: z
		.string()
		.min(30, "Deskripsi singkat minimal harus 30 karakter")
		.max(250, "Deskripsi maksimal 250 karakter"),

	category: z
		.string({
			error: "Silakan pilih kategori artikel",
		})
		.min(1, "Kategori harus dipilih"),

	cover_image_url: z
		.string()
		.url("Format URL gambar tidak valid")
		.nonempty("Gambar cover wajib diisi"),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
