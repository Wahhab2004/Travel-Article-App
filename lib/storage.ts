export const saveAuth = (data: { user: any; jwt: string }) => {
	localStorage.setItem("auth", JSON.stringify(data));
};

export const getAuth = () => {
	if (typeof window === "undefined") return null;
	const data = localStorage.getItem("auth");
	return data ? JSON.parse(data) : null;
};

export const clearAuth = () => {
	if (typeof window === "undefined") return;

	localStorage.removeItem("auth");
	localStorage.removeItem("jwt");
};
