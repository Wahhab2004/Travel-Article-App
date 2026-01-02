"use client";

import { useRouter } from "next/navigation";
import { Compass, ArrowRight, LockKeyhole, Globe2 } from "lucide-react";

export default function LandingPage() {
	const router = useRouter();

	return (
		<main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden text-slate-900">
			{/* Soft Ambient Background Decor */}
			<div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] -z-10" />
			<div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -z-10" />

			<div className="max-w-md w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
				{/* Logo & Badge */}
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 shadow-sm text-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em]">
						<Compass size={14} className="animate-spin-slow" />
						Tracle Exclusive
					</div>

					<div className="space-y-3">
						<h1 className="text-5xl font-black tracking-tighter leading-none">
							Selamat <br />
							<span className="text-blue-600">Datang.</span>
						</h1>
						<p className="text-slate-500 text-lg font-medium leading-relaxed">
							Silakan masuk untuk menjelajahi cerita perjalanan dan mengelola
							konten Anda.
						</p>
					</div>
				</div>

				{/* Single Login Card */}
				<div className="bg-white p-3 rounded-[40px] shadow-2xl shadow-blue-100/50 border border-slate-100">
					<div className="p-6 space-y-4">
						<button
							onClick={() => router.push("/login")}
							className="w-full group flex items-center justify-between p-6 rounded-[32px] bg-slate-900 hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-slate-200 cursor-pointer"
						>
							<div className="flex items-center gap-5">
								<div className="p-3 bg-slate-800 group-hover:bg-white/20 rounded-2xl transition-all group-hover:scale-110">
									<LockKeyhole
										className="text-blue-400 group-hover:text-white"
										size={24}
									/>
								</div>
								<div className="text-left">
									<p className="font-bold text-white text-lg leading-none">
										Masuk Sekarang
									</p>
									<p className="text-xs text-slate-400 group-hover:text-blue-100 mt-1 font-medium transition-colors">
										Akses penuh ke semua fitur
									</p>
								</div>
							</div>
							<ArrowRight
								className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all"
								size={20}
							/>
						</button>

						{/* Info Footer */}
						<div className="flex items-center justify-center gap-6 pt-2">
							<div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
								<Globe2 size={12} /> Public Community
							</div>
							<div className="w-1 h-1 bg-slate-300 rounded-full" />
							<div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
								<span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
								Secure Access
							</div>
						</div>
					</div>
				</div>

				{/* Sub-footer */}
				<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
					Part of Tracle Ecosystem
				</p>
			</div>
		</main>
	);
}
