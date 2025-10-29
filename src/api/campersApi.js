import axios from "axios";

const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

// сервер возвращает { total, items: [...] }
export async function getCampers({ page = 1, limit = 6, params = {} } = {}) {
  const { data } = await api.get("/campers", { params: { page, limit, ...params } });
  return { items: data.items ?? [], total: data.total ?? 0 };
}

export async function getCamperById(id) {
  const { data } = await api.get(`/campers/${id}`);
  return data;
}