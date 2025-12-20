"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { saveAuth } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toastSuccess, toastError } from "@/lib/toast";
import { ArrowRight, LockKeyhole, Mail, Compass } from "lucide-react";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const form = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const onSubmit = async (values: LoginForm) => {
		setLoading(true);
		try {
			const res = await api.post("/auth/local", {
				identifier: values.email,
				password: values.password,
			});

			const payload = {
				user: res.data.user,
				jwt: res.data.jwt,
			};

			dispatch(loginSuccess(payload));
			saveAuth(payload);
			toastSuccess("Login berhasil", "Selamat datang kembali 👋");
			router.push("/articles"); // Diarahkan ke daftar artikel
		} catch (error: any) {
			const apiError = error?.response?.data?.error;
			toastError(
				apiError?.status || "Terjadi kesalahan",
				apiError?.message || "Silakan coba lagi"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
			{/* Soft Background Accents */}
			<div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px]" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px]" />

			{/* Card Glassmorphism Light */}
			<div className="relative z-10 w-full max-w-md p-10 mx-4 bg-white/70 backdrop-blur-2xl border border-white rounded-[48px] shadow-2xl shadow-blue-100/50 animate-in fade-in zoom-in duration-500">
				{/* Logo & Header */}
				<div className="text-center mb-10 space-y-2">
					<div className="flex justify-center mb-4">
						<div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
							<Compass className="text-white" size={28} />
						</div>
					</div>
					<h1 className="text-3xl font-black text-slate-900 tracking-tight">
						Masuk ke Tracle
					</h1>
					<p className="text-slate-500 text-sm font-medium">
						Silakan masukkan akun Anda untuk melanjutkan
					</p>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

					{/* Login Button */}
					<Button
						type="submit"
						disabled={loading || !form.formState.isValid}
						className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-200 disabled:opacity-50 transition-all mt-4"
					>
						{loading ? "Memproses..." : "Masuk Sekarang"}
						{!loading && <ArrowRight size={20} />}
					</Button>

					{/* Register Link */}
					<div className="text-center mt-8">
						<p className="text-sm text-slate-500 font-medium">
							Belum punya akun?{" "}
							<button
								type="button"
								onClick={() => router.push("/register")}
								className="text-blue-600 font-bold hover:underline underline-offset-4"
							>
								Daftar Gratis
							</button>
						</p>
					</div>
				</form>
			</div>

			{/* Sub-footer */}
			<div className="absolute bottom-8 text-center w-full">
				<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
					Secure Authentication By Tracle
				</p>
			</div>
		</div>
	);
}
