import api from "@/lib/api";

export const getDashboardStats = async () => {
  const [articles] = await Promise.all([
    api.get("/articles?pagination[pageSize]=1"),
  ]);

  return {
    totalArticles: articles.data.meta.pagination.total,
  };
};
