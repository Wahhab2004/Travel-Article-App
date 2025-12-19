import axios from "axios";
import { getAuth, clearAuth } from "@/lib/storage";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 1. Request Interceptor: Menambahkan Token ke Header
api.interceptors.request.use(
	(config) => {
		const auth = getAuth();
		if (auth?.jwt) {
			config.headers.Authorization = `Bearer ${auth.jwt}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 2. Response Interceptor: Menangani error 401/403 (Logout otomatis)
api.interceptors.response.use(
	(response) => response,
	(error) => {
		
		if (error.response) {
			const { status } = error.response;

			if (status === 401 || status === 403) {
				clearAuth();

				if (typeof window !== "undefined") {
					window.location.href = "/login";
				}
			}
		}

		return Promise.reject(error);
	}
);

export default api;
