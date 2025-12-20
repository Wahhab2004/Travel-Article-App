"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/authSlice";
import { clearAuth } from "@/lib/storage";
import { toastInfo } from "@/lib/toast";

export default function LogoutButton() {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogout = () => {
		clearAuth();
		dispatch(logout()); 

		toastInfo("Logout", "Token berhasil dibersihkan");

		router.push("/login");
	};

	return (
		<Button variant="destructive" onClick={handleLogout}>
			Clear Token / Logout
		</Button>
	);
}
