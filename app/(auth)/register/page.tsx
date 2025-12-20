"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, User, Mail, LockKeyhole, Compass } from "lucide-react";

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
				"Silakan login menggunakan akun baru Anda"
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
		<div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
			{/* Soft Background Accents */}
			<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px]" />
			<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px]" />

			{/* Card Glassmorphism Light */}
			<div className="relative z-10 w-full max-w-md p-10 mx-4 bg-white/70 backdrop-blur-2xl border border-white rounded-[48px] shadow-2xl shadow-blue-100/50 animate-in fade-in zoom-in duration-500">
				{/* Header */}
				<div className="text-center mb-8 space-y-2">
					<div className="flex justify-center mb-4">
						<div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
							<Compass className="text-white" size={28} />
						</div>
					</div>
					<h1 className="text-3xl font-black text-slate-900 tracking-tight">
						Daftar Akun
					</h1>
					<p className="text-slate-500 text-sm font-medium">
						Mulai petualangan Anda bersama{" "}
						<span className="text-blue-600 font-bold">Tracle</span>
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
					{/* Input Username */}
					<div className="space-y-2">
						<label className="text-xs text-slate-500 ml-4 font-bold uppercase tracking-widest">
							Username
						</label>
						<div className="relative">
							<input
								{...form.register("username")}
								placeholder="johndoe"
								className="w-full bg-white border border-slate-200 rounded-2xl p-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
							/>
							<User
								className="absolute left-4 top-4 text-slate-400"
								size={20}
							/>
						</div>
						{form.formState.errors.username && (
							<p className="text-red-500 text-xs mt-1 ml-4 font-medium italic">
								{form.formState.errors.username.message}
							</p>
						)}
					</div>

					{/* Input Email */}
					<div className="space-y-2">
						<label className="text-xs text-slate-500 ml-4 font-bold uppercase tracking-widest">
							Email Address
						</label>
						<div className="relative">
							<input
								{...form.register("email")}
								type="email"
								placeholder="name@example.com"
								className="w-full bg-white border border-slate-200 rounded-2xl p-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
							/>
							<Mail
								className="absolute left-4 top-4 text-slate-400"
								size={20}
							/>
						</div>
						{form.formState.errors.email && (
							<p className="text-red-500 text-xs mt-1 ml-4 font-medium italic">
								{form.formState.errors.email.message}
							</p>
						)}
					</div>

					{/* Input Password */}
					<div className="space-y-2">
						<label className="text-xs text-slate-500 ml-4 font-bold uppercase tracking-widest">
							Password
						</label>
						<div className="relative">
							<input
								type="password"
								{...form.register("password")}
								placeholder="••••••••"
								className="w-full bg-white border border-slate-200 rounded-2xl p-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
							/>
							<LockKeyhole
								className="absolute left-4 top-4 text-slate-400"
								size={20}
							/>
						</div>
						{form.formState.errors.password && (
							<p className="text-red-500 text-xs mt-1 ml-4 font-medium italic">
								{form.formState.errors.password.message}
							</p>
						)}
					</div>

					{/* Register Button */}
					<Button
						type="submit"
						disabled={loading || !form.formState.isValid}
						className="w-full h-14 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-200 disabled:opacity-50 transition-all"
					>
						{loading ? "Mendaftarkan..." : "Daftar Sekarang"}
						{!loading && <ArrowRight size={20} />}
					</Button>

					{/* Login Link */}
					<div className="text-center mt-6">
						<p className="text-sm text-slate-500 font-medium">
							Sudah memiliki akun?{" "}
							<Link
								href="/login"
								className="text-blue-600 font-bold hover:underline underline-offset-4"
							>
								Masuk di sini
							</Link>
						</p>
					</div>
				</form>
			</div>

			{/* Sub-footer */}
			<div className="absolute bottom-8 text-center w-full">
				<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
					Join the Tracle Community
				</p>
			</div>
		</div>
	);
}
