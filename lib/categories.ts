import api from "@/lib/api";

/* READ */
export const getCategories = () => api.get("/categories");

/* READ BY ID */
export const getCategoryById = (documentId: string) => api.get(`/categories/${documentId}`);

/* CREATE */
export const createCategory = (data: { name: string }) =>
	api.post("/categories", {
		data,
	});

/* UPDATE */
export const updateCategory = (documentId: string, data: { name: string }) =>
	api.put(`/categories/${documentId}`, {
		data,
	});

/* DELETE */
export const deleteCategory = (documentId: string) => api.delete(`/categories/${documentId}`);
