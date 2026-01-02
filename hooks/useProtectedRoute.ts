// "use client";

// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { RootState } from "@/store";

// export const useAdminGuard = () => {
// 	const router = useRouter();
// 	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

// 	useEffect(() => {
// 		if (!isAuthenticated) {
// 			router.replace("/login");
// 		}
// 	}, [isAuthenticated, router]);
// };
