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
	};4
	4

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="max-w-sm mx-auto mt-20 space-y-4"
		>
			<h1 className="text-2xl font-bold">Admin Login</h1>

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

			<Button
				type="submit"
				className="w-full cursor-pointer disabled:cursor-not-allowed"
				disabled={loading || !form.formState.isValid}
			>
				{loading ? "Logging in..." : "Login"}
			</Button>

			<button type="button">random</button>
		</form>
	);
}
