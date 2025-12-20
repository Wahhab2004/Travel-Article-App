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
import { ArrowRight } from "lucide-react"; // Import icon panah

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
			router.push("/dashboard");
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

		<div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
			{/* Background Assets */}
			<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
			<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />

			{/* Card Glassmorphism */}
			<div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-semibold text-white tracking-tight">
						Tracle
					</h1>
					<h2 className="text-gray-400 mt-2 text-sm font-light">
						Welcome Back to <span className="text-blue-400">Tracle</span>
					</h2>
				
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Input Email */}
					<div className="space-y-1">
						<label className="text-xs text-gray-400 ml-4 font-medium uppercase tracking-wider">
							Email
						</label>
						<input
							{...form.register("email")}
							placeholder="admin@email.com"
							className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
						/>
						{form.formState.errors.email && (
							<p className="text-red-400 text-xs mt-1 ml-4">
								{form.formState.errors.email.message}
							</p>
						)}
					</div>

					{/* Input Password */}
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

					{/* Login */}
					<Button
						type="submit"
						disabled={loading || !form.formState.isValid}
						className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all"
					>
						{loading ? "Logging in..." : "Login"}
						{!loading && (
							<div className="bg-white/20 p-1 rounded-full">
								<ArrowRight size={18} />
							</div>
						)}
					</Button>


					{/* Register */}
					<div className="text-center mt-6">
						<p className="text-xs text-gray-500">
							Don't have an account?{" "}
							<Button
								type="button"
								onClick={() => router.push("/register")}
								className="text-gray-300 font-semibold underline hover:text-blue-400 transition-colors"
							>
								Register
							</Button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
