"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toastError, toastSuccess } from "@/lib/toast";
import { registerSchema } from "@/schemas/auth.schema";

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const form = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema),
		mode: "onChange",
	});

	const onSubmit = async (values: RegisterForm) => {
		setLoading(true);

		try {
			await api.post("/auth/local/register", {
				username: values.username,
				email: values.email,
				password: values.password,
			});

			toastSuccess(
				"Registrasi berhasil",
				"Silakan login menggunakan akun Anda"
			);

			router.push("/login");
		} catch (error: any) {
			if (!error.response) {
				toastError("Koneksi gagal", "Tidak dapat terhubung ke server");
				return;
			}

			const apiError = error.response.data?.error;

			toastError(
				apiError?.name || "Registrasi gagal",
				apiError?.message || "Terjadi kesalahan"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit, (errors) => {
				const firstError = Object.values(errors)[0];
				if (firstError?.message) {
					toastError("Form tidak valid", firstError.message as string);
				}
			})}
			className="max-w-sm mx-auto mt-20 space-y-4"
		>
			<h1 className="text-2xl font-bold">Register</h1>

			<input
				{...form.register("username")}
				placeholder="Username"
				className="border p-2 w-full"
			/>

			<input
				{...form.register("email")}
				placeholder="Email"
				className="border p-2 w-full"
			/>

			{form.formState.errors.email && (
				<p className="text-red-500 text-sm">
					{form.formState.errors.email.message}
				</p>
			)}
			<input
				type="password"
				{...form.register("password")}
				placeholder="Password"
				className="border p-2 w-full"
			/>

			{form.formState.errors.password && (
				<p className="text-red-500 text-sm">
					{form.formState.errors.password.message}
				</p>
			)}

			<Button type="submit" className="w-full" disabled={loading}>
				{loading ? "Registering..." : "Register"}
			</Button>
		</form>
	);
}
