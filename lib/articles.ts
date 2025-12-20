import api from "@/lib/api";

/* READ */
export const getArticles = () => api.get("/articles?populate=*");

export const getArticleBydocumentId = (documentId: string) =>
	api.get(`/articles/${documentId}`);

/* CREATE */
export const createArticle = (data: {
	title: string;
	description: string;
	cover_image_url: string;
	category: number;
}) =>
	api.post("/articles", {
		data,
	});

/* UPDATE */
export const updateArticle = (
	documentId: string,
	data: Partial<{
		title: string;
		description: string;
		content: string;
		cover_image_url: string;
		category: number;
	}>
) =>
	api.put(`/articles/${documentId}`, {
		data,
	});

/* DELETE */
export const deleteArticle = (documentId: string) => api.delete(`/articles/${documentId}`);
