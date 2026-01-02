import api from "@/lib/api";

/* READ */
export const getArticles = (
	page: number = 0,
	pageSize: number = 2,
	search: string = "",
	category: string = ""
) => {
	let url = `/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=publishedAt:desc`;

	if (search) {
		url += `&filters[title][$containsi]=${search}`;
	}

	if (category) {
		url += `&filters[category][name][$eq]=${category}`;
	}

	return api.get(url);
};

/* READ BY ID */
export const getArticleBydocumentId = (documentId: string) =>
	api.get(`/articles/${documentId}`);

/* CREATE */
export const createArticle = (data: {
	title: string;
	description: string;
	cover_image_url: string;
	category: string;
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
export const deleteArticle = (documentId: string) =>
	api.delete(`/articles/${documentId}`);
