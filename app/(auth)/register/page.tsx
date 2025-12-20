"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Gunakan Link untuk navigasi lebih cepat
import { ArrowRight } from "lucide-react";

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
		<div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
			{/* Background Assets (Blur Blobs) */}
			<div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />

			{/* Card Glassmorphism */}
			<div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-semibold text-white tracking-tight">
						Create Account
					</h1>
					<p className="text-gray-400 mt-2 text-sm font-light">
						Create your account to start using{" "}
						<span className="text-blue-400">Tracle</span>
					</p>
				</div>

				<form
					onSubmit={form.handleSubmit(onSubmit, (errors) => {
						const firstError = Object.values(errors)[0];
						if (firstError?.message) {
							toastError("Form tidak valid", firstError.message as string);
						}
					})}
					className="space-y-5"
				>
					{/* Username */}
					<div className="space-y-1">
						<label className="text-xs text-gray-400 ml-4 font-medium uppercase tracking-wider">
							Username
						</label>
						<input
							{...form.register("username")}
							placeholder="johndoe"
							className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
						/>
						{form.formState.errors.username && (
							<p className="text-red-400 text-xs mt-1 ml-4">
								{form.formState.errors.username.message}
							</p>
						)}
					</div>

					{/* Email */}
					<div className="space-y-1">
						<label className="text-xs text-gray-400 ml-4 font-medium uppercase tracking-wider">
							Email Address
						</label>
						<input
							{...form.register("email")}
							placeholder="example@mail.com"
							className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
						/>

						{form.formState.errors.email && (
							<p className="text-red-400 text-xs mt-1 ml-4">
								{form.formState.errors.email.message}
							</p>
						)}
					</div>

					{/* Password */}
					<div className="space-y-1">
						<label className="text-xs text-gray-400 ml-4 font-medium uppercase tracking-wider">
							Password
						</label>
						<input
							type="password"
							{...form.register("password")}
							placeholder="••••••••"
							className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
						/>

						{form.formState.errors.password && (
							<p className="text-red-400 text-xs mt-1 ml-4">
								{form.formState.errors.password.message}
							</p>
						)}
					</div>

					{/* Button Register */}
					<Button
						type="submit"
						disabled={loading || !form.formState.isValid}
						className="w-full h-14 mt-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all"
					>
						{loading ? "Registering..." : "Register"}
						{!loading && (
							<div className="bg-white/20 p-1 rounded-full">
								<ArrowRight size={18} />
							</div>
						)}
					</Button>

					<div className="text-center mt-6">
						<p className="text-xs text-gray-500 font-light">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-gray-200 font-semibold underline hover:text-blue-400 transition-colors"
							>
								Login here
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
