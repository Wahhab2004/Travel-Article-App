export const saveAuth = (payload: any) => {
	localStorage.setItem("auth", JSON.stringify(payload));
	localStorage.setItem("jwt", payload.jwt);

	document.cookie = `jwt=${payload.jwt}; path=/`;
};

export const getAuth = () => {
	if (typeof window === "undefined") return null;
	const data = localStorage.getItem("auth");
	return data ? JSON.parse(data) : null;
};

export const clearAuth = () => {
	localStorage.clear();
	document.cookie = "jwt=; Max-Age=0; path=/";
};
